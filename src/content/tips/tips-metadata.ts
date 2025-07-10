import type { TipFrontmatter } from "@/features/tips/types";

// Tipsのメタデータを管理
export const tipsMetadata: Record<string, TipFrontmatter> = {
  "bishop-movement": {
    title: "The Bishop's Movement",
    titleJa: "ビショップの動き",
    slug: "bishop-movement",
    category: "piece-movement",
    difficulty: "beginner",
    tags: ["bishop", "diagonal", "movement", "basics"],
    tagsJa: ["ビショップ", "斜め", "動き", "基本"],
    publishedAt: "2024-01-15",
    excerpt:
      "Learn how bishops dominate diagonals with their unique movement pattern",
    excerptJa:
      "ビショップの特殊な動きパターンで斜めを支配する方法を学びましょう",
  },
  "king-movement": {
    title: "The King's Movement",
    titleJa: "キングの動き",
    slug: "king-movement",
    category: "piece-movement",
    difficulty: "beginner",
    tags: ["king", "movement", "basics", "safety"],
    tagsJa: ["キング", "動き", "基本", "安全"],
    publishedAt: "2024-01-25",
    excerpt:
      "Master the king's movement patterns and understand its crucial role in chess",
    excerptJa:
      "キングの動きパターンをマスターし、チェスでの重要な役割を理解しましょう",
  },
  "knight-movement": {
    title: "The Knight's Movement",
    titleJa: "ナイトの動き",
    slug: "knight-movement",
    category: "piece-movement",
    difficulty: "beginner",
    tags: ["knight", "movement", "L-shape", "basics"],
    tagsJa: ["ナイト", "動き", "L字", "基本"],
    publishedAt: "2024-01-20",
    excerpt: "Master the knight's unique L-shaped movement pattern",
    excerptJa: "ナイトの特殊なL字の動きパターンをマスターしましょう",
  },
  "rook-movement": {
    title: "The Rook's Movement",
    titleJa: "ルークの動き",
    slug: "rook-movement",
    category: "piece-movement",
    difficulty: "beginner",
    tags: ["rook", "movement", "ranks", "files"],
    tagsJa: ["ルーク", "動き", "ランク", "ファイル"],
    publishedAt: "2024-01-10",
    excerpt:
      "Learn how rooks dominate ranks and files with their linear movement",
    excerptJa:
      "ルークの直線的な動きでランクとファイルを支配する方法を学びましょう",
  },
  "square-colors": {
    title: "Understanding Square Colors",
    titleJa: "マス目の色の理解",
    slug: "square-colors",
    category: "general",
    difficulty: "beginner",
    tags: ["squares", "colors", "board", "basics"],
    tagsJa: ["マス", "色", "盤", "基本"],
    publishedAt: "2024-01-05",
    excerpt:
      "Master the chessboard's alternating color pattern for better piece coordination",
    excerptJa:
      "駒の連携を向上させるためのチェス盤の交互色パターンをマスターしましょう",
  },
  "algebraic-notation-basics": {
    title: "Algebraic Notation Basics",
    titleJa: "代数記法の基本",
    slug: "algebraic-notation-basics",
    category: "notation",
    difficulty: "beginner",
    tags: ["notation", "algebraic", "moves", "basics"],
    tagsJa: ["記法", "代数", "手", "基本"],
    publishedAt: "2024-01-30",
    excerpt:
      "Master the standard chess notation system for recording and communicating moves",
    excerptJa:
      "手の記録と伝達のための標準チェス記法システムをマスターしましょう",
  },
};

// 利用可能なスラッグの配列
export const AVAILABLE_TIPS = Object.keys(tipsMetadata);
