import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { APP_LOGO, APP_TITLE } from "@/const";
import { UtensilsCrossed, Clock, Truck, Users } from "lucide-react";

export default function CustomerHome() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10" />}
            <h1 className="text-2xl font-bold text-amber-900">{APP_TITLE}</h1>
          </div>
          <nav className="flex gap-4 items-center">
            <Button variant="ghost" onClick={() => setLocation("/menu")}>
              {t("menu")}
            </Button>
            <Button variant="ghost" onClick={() => setLocation("/reservations")}>
              {t("reservations")}
            </Button>
            <Button variant="ghost" onClick={() => setLocation("/cart")}>
              {t("cart")}
            </Button>
            {user?.role === "admin" && (
              <Button variant="outline" onClick={() => setLocation("/admin")}>
                {t("admin")}
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">{t("welcomeToRestaurant")}</h2>
          <p className="text-xl mb-8 opacity-90">
            {language === "ar"
              ? "استمتع بأشهى الأطباق التقليدية والعصرية"
              : language === "fr"
              ? "Savourez les meilleurs plats traditionnels et modernes"
              : "Enjoy the finest traditional and modern dishes"}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50"
              onClick={() => setLocation("/menu")}
            >
              {t("orderNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-700"
              onClick={() => setLocation("/reservations")}
            >
              {t("makeReservation")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-amber-900">
            {language === "ar"
              ? "لماذا تختارنا"
              : language === "fr"
              ? "Pourquoi nous choisir"
              : "Why Choose Us"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-amber-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">
                {language === "ar"
                  ? "طعام طازج"
                  : language === "fr"
                  ? "Nourriture fraîche"
                  : "Fresh Food"}
              </h4>
              <p className="text-gray-600">
                {language === "ar"
                  ? "نستخدم أفضل المكونات الطازجة يومياً"
                  : language === "fr"
                  ? "Nous utilisons les meilleurs ingrédients frais quotidiennement"
                  : "We use the finest fresh ingredients daily"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">
                {language === "ar"
                  ? "توصيل سريع"
                  : language === "fr"
                  ? "Livraison rapide"
                  : "Fast Delivery"}
              </h4>
              <p className="text-gray-600">
                {language === "ar"
                  ? "توصيل سريع وآمن إلى باب منزلك"
                  : language === "fr"
                  ? "Livraison rapide et sécurisée à votre porte"
                  : "Quick and safe delivery to your door"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-amber-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">
                {language === "ar"
                  ? "خدمة موثوقة"
                  : language === "fr"
                  ? "Service fiable"
                  : "Reliable Service"}
              </h4>
              <p className="text-gray-600">
                {language === "ar"
                  ? "خدمة عملاء ممتازة 24/7"
                  : language === "fr"
                  ? "Excellent service client 24/7"
                  : "Excellent customer service 24/7"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">
                {language === "ar"
                  ? "تجربة رائعة"
                  : language === "fr"
                  ? "Expérience exceptionnelle"
                  : "Great Experience"}
              </h4>
              <p className="text-gray-600">
                {language === "ar"
                  ? "انضم لآلاف العملاء الراضين"
                  : language === "fr"
                  ? "Rejoignez des milliers de clients satisfaits"
                  : "Join thousands of satisfied customers"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {language === "ar"
              ? "جاهز للطلب؟"
              : language === "fr"
              ? "Prêt à commander?"
              : "Ready to Order?"}
          </h3>
          <p className="text-lg mb-8 opacity-90">
            {language === "ar"
              ? "اختر من قائمتنا الواسعة واستمتع بتجربة طعام لا تنسى"
              : language === "fr"
              ? "Choisissez parmi notre large sélection et profitez d'une expérience culinaire inoubliable"
              : "Choose from our wide selection and enjoy an unforgettable dining experience"}
          </p>
          <Button
            size="lg"
            className="bg-white text-amber-700 hover:bg-amber-50"
            onClick={() => setLocation("/menu")}
          >
            {t("viewMenu")}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {APP_TITLE}. {language === "ar" ? "جميع الحقوق محفوظة" : language === "fr" ? "Tous droits réservés" : "All rights reserved"}</p>
        </div>
      </footer>
    </div>
  );
}

