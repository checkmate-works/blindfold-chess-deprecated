export interface TipFrontmatter {
  title: string;
  titleJa: string;
  slug: string;
  category: "piece-movement" | "tactics" | "strategy" | "notation" | "general";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  tagsJa: string[];
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  excerptJa: string;
}

export interface Tip {
  frontmatter: TipFrontmatter;
  content: {
    en: string;
    ja: string;
  };
}

export interface TipCategory {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  icon: string;
}
