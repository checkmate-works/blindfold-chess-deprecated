import { tipsData } from "@/content/tips/tips-data";
import type { Tip, TipCategory } from "../types";

// カテゴリー定義
export const categories: TipCategory[] = [
  {
    id: "piece-movement",
    name: "Piece Movement",
    nameJa: "駒の動き",
    description: "Learn how each piece moves on the chessboard",
    descriptionJa: "各駒の動き方を学ぶ",
    icon: "♟",
  },
  {
    id: "tactics",
    name: "Tactics",
    nameJa: "戦術",
    description: "Common tactical patterns and combinations",
    descriptionJa: "一般的な戦術パターンとコンビネーション",
    icon: "⚔️",
  },
  {
    id: "strategy",
    name: "Strategy",
    nameJa: "戦略",
    description: "Long-term planning and positional play",
    descriptionJa: "長期的な計画と位置的なプレイ",
    icon: "🎯",
  },
  {
    id: "notation",
    name: "Notation",
    nameJa: "記法",
    description: "Understanding algebraic notation",
    descriptionJa: "代数記法の理解",
    icon: "📝",
  },
  {
    id: "general",
    name: "General",
    nameJa: "一般",
    description: "General chess knowledge and tips",
    descriptionJa: "一般的なチェスの知識とヒント",
    icon: "💡",
  },
];

// Export tips data
export const tips = tipsData;

export const getTipBySlug = (slug: string): Tip | undefined => {
  return tips.find((tip) => tip.frontmatter.slug === slug);
};

export const getTipsByCategory = (category: string): Tip[] => {
  return tips.filter((tip) => tip.frontmatter.category === category);
};

export const getCategoryById = (id: string): TipCategory | undefined => {
  return categories.find((cat) => cat.id === id);
};
