import { useLanguage, translations } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { language } = useLanguage();
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCart();
  const [, setLocation] = useLocation();
  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  const getItemName = (item: any) => {
    if (language === "ar") return item.nameAr;
    if (language === "fr") return item.nameFr;
    return item.nameEn;
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("yourCart")}</h1>
        <p className="text-gray-600 mb-8">{t("emptyCart")}</p>
        <Button onClick={() => setLocation("/menu")}>{t("continueShopping")}</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("yourCart")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 mb-4 flex gap-4">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={getItemName(item)} className="w-24 h-24 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{getItemName(item)}</h3>
                <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeItem(item.menuItemId)} className="text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">{t("total")}</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>{t("subtotal")}</span>
              <span>${(getSubtotal() / 100).toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => setLocation("/checkout")}>
            {t("checkout")}
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={() => setLocation("/menu")}>
            {t("continueShopping")}
          </Button>
        </div>
      </div>
    </div>
  );
}

