import { useLanguage, translations } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLocation } from "wouter";
import { ShoppingCart } from "lucide-react";

export default function MenuPage() {
  const { language } = useLanguage();
  const { addItem } = useCart();
  const [, setLocation] = useLocation();
  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  const { data: menuItems, isLoading: itemsLoading } = trpc.menuItems.list.useQuery(undefined);

  if (categoriesLoading || itemsLoading) {
    return <div className="container mx-auto px-4 py-8">{t("loading")}</div>;
  }

  const getItemName = (item: any) => {
    if (language === "ar") return item.nameAr;
    if (language === "fr") return item.nameFr;
    return item.nameEn;
  };

  const getItemDescription = (item: any) => {
    if (language === "ar") return item.descriptionAr;
    if (language === "fr") return item.descriptionFr;
    return item.descriptionEn;
  };

  const getCategoryName = (category: any) => {
    if (language === "ar") return category.nameAr;
    if (language === "fr") return category.nameFr;
    return category.nameEn;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900">{t("menu")}</h1>
          <Button onClick={() => setLocation("/cart")} className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            {t("cart")}
          </Button>
        </div>

        {categories?.map((category: any) => {
          const categoryItems = menuItems?.filter((item: any) => item.categoryId === category.id) || [];
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">{getCategoryName(category)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item: any) => (
                  <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={getItemName(item)}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{getItemName(item)}</h3>
                      <p className="text-gray-600 text-sm mb-4">{getItemDescription(item)}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-700">
                          ${(item.price / 100).toFixed(2)}
                        </span>
                        <Button
                          onClick={() =>
                            addItem({
                              menuItemId: item.id,
                              name: getItemName(item),
                              nameAr: item.nameAr,
                              nameEn: item.nameEn,
                              nameFr: item.nameFr,
                              price: item.price,
                              quantity: 1,
                              imageUrl: item.imageUrl,
                            })
                          }
                          disabled={!item.isAvailable}
                        >
                          {item.isAvailable ? t("addToCart") : t("notAvailable")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

