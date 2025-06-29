import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { MarkdownContent } from "../components/markdown-content";
import { categories, getTipBySlug } from "../utils/tips-loader";

const TipDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isJapanese = i18n.language === "ja";

  const tip = slug ? getTipBySlug(slug) : undefined;
  const category = tip
    ? categories.find((c) => c.id === tip.frontmatter.category)
    : undefined;

  if (!tip) {
    return (
      <ContentLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-chess-gray-900 mb-4">
            {t("tips.notFound")}
          </h1>
          <Link
            to="/tips"
            className="inline-flex items-center gap-2 text-chess-gray-600 hover:text-chess-gray-900"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t("tips.backToList")}
          </Link>
        </div>
      </ContentLayout>
    );
  }

  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {tip.frontmatter.title} - {t("tips.title")} - {t("app.title")}
        </title>
      </Helmet>
      <ContentLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 戻るリンク */}
          <Link
            to="/tips"
            className="inline-flex items-center gap-2 text-chess-gray-600 hover:text-chess-gray-900 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t("tips.backToList")}
          </Link>

          {/* ヘッダー */}
          <div className="mb-8 pb-8 border-b border-chess-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{category?.icon}</span>
              <span className="text-chess-gray-600">
                {isJapanese ? category?.nameJa : category?.name}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyBadgeClass(
                  tip.frontmatter.difficulty,
                )}`}
              >
                {tip.frontmatter.difficulty}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-chess-gray-900 mb-4">
              {isJapanese ? tip.frontmatter.titleJa : tip.frontmatter.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {(isJapanese ? tip.frontmatter.tagsJa : tip.frontmatter.tags).map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-chess-gray-100 text-chess-gray-700 text-sm rounded-md"
                  >
                    #{tag}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* コンテンツ */}
          <MarkdownContent
            content={isJapanese ? tip.content.ja : tip.content.en}
          />

          {/* フッター */}
          <div className="mt-12 pt-8 border-t border-chess-gray-200 text-sm text-chess-gray-600">
            <p>
              {t("tips.publishedAt")}: {tip.frontmatter.publishedAt}
            </p>
            {tip.frontmatter.updatedAt && (
              <p>
                {t("tips.updatedAt")}: {tip.frontmatter.updatedAt}
              </p>
            )}
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default TipDetailRoute;
