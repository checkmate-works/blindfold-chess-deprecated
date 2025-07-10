// マークダウンファイルの静的インポート
import algebraicNotationEn from "./en/algebraic-notation-basics.md?raw";
import bishopMovementEn from "./en/bishop-movement.md?raw";
import kingMovementEn from "./en/king-movement.md?raw";
import knightMovementEn from "./en/knight-movement.md?raw";
import rookMovementEn from "./en/rook-movement.md?raw";
import squareColorsEn from "./en/square-colors.md?raw";
import algebraicNotationJa from "./ja/algebraic-notation-basics.md?raw";
import bishopMovementJa from "./ja/bishop-movement.md?raw";
import kingMovementJa from "./ja/king-movement.md?raw";
import knightMovementJa from "./ja/knight-movement.md?raw";
import rookMovementJa from "./ja/rook-movement.md?raw";
import squareColorsJa from "./ja/square-colors.md?raw";

// マークダウンコンテンツのマッピング
const markdownContent: Record<string, { en: string; ja: string }> = {
  "bishop-movement": {
    en: bishopMovementEn,
    ja: bishopMovementJa,
  },
  "king-movement": {
    en: kingMovementEn,
    ja: kingMovementJa,
  },
  "knight-movement": {
    en: knightMovementEn,
    ja: knightMovementJa,
  },
  "rook-movement": {
    en: rookMovementEn,
    ja: rookMovementJa,
  },
  "square-colors": {
    en: squareColorsEn,
    ja: squareColorsJa,
  },
  "algebraic-notation-basics": {
    en: algebraicNotationEn,
    ja: algebraicNotationJa,
  },
};

// マークダウンコンテンツを取得する関数
export function getMarkdownContent(slug: string, locale: "en" | "ja"): string {
  const content = markdownContent[slug];
  if (!content) {
    return `# Content Not Found\n\nThe requested content "${slug}" could not be found.`;
  }
  return content[locale];
}

// 利用可能なスラッグを取得
export function getAvailableSlugs(): string[] {
  return Object.keys(markdownContent);
}
