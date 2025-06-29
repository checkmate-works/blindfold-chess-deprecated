import { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { categories, getTipsByCategory } from "../utils/tips-loader";

const TipsListRoute = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isJapanese = i18n.language === "ja";

  const filteredTips = selectedCategory
    ? getTipsByCategory(selectedCategory)
    : getTipsByCategory("piece-movement")
        .concat(getTipsByCategory("tactics"))
        .concat(getTipsByCategory("strategy"))
        .concat(getTipsByCategory("notation"))
        .concat(getTipsByCategory("general"));

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
          {t("tips.title")} - {t("app.title")}
        </title>
      </Helmet>
      <ContentLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-chess-gray-900 mb-2">
              {t("tips.title")}
            </h1>
            <p className="text-chess-gray-600">{t("tips.description")}</p>
          </div>

          {/* カテゴリーフィルター */}
          <div className="mb-8">
            <div className="bg-chess-white p-2 rounded-xl shadow-sm border border-chess-gray-200">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === null
                      ? "bg-chess-black text-chess-white shadow-md scale-[1.02]"
                      : "bg-transparent text-chess-gray-700 hover:bg-chess-gray-100"
                  }`}
                >
                  {t("tips.allCategories")}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-chess-black text-chess-white shadow-md scale-[1.02]"
                        : "bg-transparent text-chess-gray-700 hover:bg-chess-gray-100"
                    }`}
                  >
                    <span className="mr-2 text-lg">{category.icon}</span>
                    <span>{isJapanese ? category.nameJa : category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 選択中のカテゴリー説明 */}
            {selectedCategory && (
              <div className="mt-4 p-4 bg-chess-gray-50 rounded-lg">
                <p className="text-sm text-chess-gray-600">
                  {isJapanese
                    ? categories.find((c) => c.id === selectedCategory)
                        ?.descriptionJa
                    : categories.find((c) => c.id === selectedCategory)
                        ?.description}
                </p>
              </div>
            )}
          </div>

          {/* Tips一覧 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTips.map((tip) => {
              const category = categories.find(
                (c) => c.id === tip.frontmatter.category,
              );
              return (
                <Link
                  key={tip.frontmatter.slug}
                  to={`/tips/${tip.frontmatter.slug}`}
                  className="bg-chess-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-chess-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category?.icon}</span>
                      <span className="text-sm text-chess-gray-600">
                        {isJapanese ? category?.nameJa : category?.name}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyBadgeClass(
                        tip.frontmatter.difficulty,
                      )}`}
                    >
                      {tip.frontmatter.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-chess-gray-900 mb-2">
                    {isJapanese
                      ? tip.frontmatter.titleJa
                      : tip.frontmatter.title}
                  </h3>
                  <p className="text-chess-gray-600 mb-4 line-clamp-2">
                    {isJapanese
                      ? tip.frontmatter.excerptJa
                      : tip.frontmatter.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(isJapanese
                      ? tip.frontmatter.tagsJa
                      : tip.frontmatter.tags
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-chess-gray-100 text-chess-gray-700 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <BookOpenIcon className="w-12 h-12 text-chess-gray-400 mx-auto mb-4" />
              <p className="text-chess-gray-600">{t("tips.noTipsFound")}</p>
            </div>
          )}
        </div>
      </ContentLayout>
    </>
  );
};

export default TipsListRoute;
