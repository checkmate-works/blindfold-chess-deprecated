import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

// ビルドが存在するか確認
if (!existsSync(distDir)) {
  console.warn(
    "❌ Error: Build directory not found. Please run 'bun run build' first.",
  );
  process.exit(1);
}

// tips-data.tsからデータを取得するための簡易的な方法
// 実際のslugを手動でリストアップ（tips-data.tsから抽出）
const tipSlugs = [
  "bishop-movement",
  "knight-movement",
  "king-movement",
  "rook-movement",
  "square-colors",
];

// プリレンダリングするルートのリスト
const routes = [
  {
    path: "/tips",
    title: "Chess Tips & Strategies | Blindfold Chess",
    description:
      "Learn chess tactics, strategies, and improve your blindfold chess skills",
  },
  ...tipSlugs.map((slug) => ({
    path: `/tips/${slug}`,
    title: `${slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} | Blindfold Chess Tips`,
    description:
      "Learn chess tips and strategies to improve your blindfold chess skills",
  })),
];

// HTMLテンプレートを読み込む
const indexHtml = readFileSync(join(distDir, "index.html"), "utf-8");

// 各ルートのHTMLを生成
routes.forEach(({ path, title, description }) => {
  const htmlPath =
    path === "/"
      ? join(distDir, "index.html")
      : join(distDir, path.slice(1) + ".html");

  // ディレクトリを作成
  mkdirSync(dirname(htmlPath), { recursive: true });

  // メタデータを更新したHTMLを生成
  let html = indexHtml;

  // タイトルタグを更新
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // メタディスクリプションを追加/更新
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`,
    );
  } else {
    html = html.replace(
      "</head>",
      `  <meta name="description" content="${description}" />\n  </head>`,
    );
  }

  // OGPタグを追加
  const ogTags = `
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="${path === "/tips" ? "website" : "article"}" />
  <meta property="og:url" content="https://chess-blindfold.vercel.app${path}" />
  <meta property="og:site_name" content="Blindfold Chess" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />`;

  // 既存のOGPタグを削除してから新しいものを追加
  html = html.replace(
    /<meta\s+property="og:[^"]+"\s+content="[^"]*"\s*\/?>/g,
    "",
  );
  html = html.replace(
    /<meta\s+name="twitter:[^"]+"\s+content="[^"]*"\s*\/?>/g,
    "",
  );
  html = html.replace("</head>", `${ogTags}\n  </head>`);

  // Vercelのリダイレクト用にもindex.htmlを作成
  if (path !== "/" && path !== "/tips") {
    const indexPath = join(distDir, path.slice(1), "index.html");
    mkdirSync(dirname(indexPath), { recursive: true });
    writeFileSync(indexPath, html);
  }

  // HTMLを書き出す
  writeFileSync(htmlPath, html);
  console.info(`✓ Generated: ${htmlPath}`);
});

// サイトマップを生成
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://chess-blindfold.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${routes
  .map(
    ({ path }) => `  <url>
    <loc>https://chess-blindfold.vercel.app${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "/tips" ? "0.9" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

writeFileSync(join(distDir, "sitemap.xml"), sitemap);
console.info("✓ Generated: sitemap.xml");

console.info("\n✨ Prerendering completed!");
