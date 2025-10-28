import { useLanguage, translations } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { APP_TITLE } from "@/const";

export default function AboutPage() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-amber-900">{t("about")}</h1>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">{APP_TITLE}</h2>
          <p className="text-gray-600 mb-4">
            {language === "ar"
              ? "نحن مطعم متخصص في تقديم أشهى الأطباق التقليدية والعصرية. مع فريق من الطهاة المحترفين والموظفين المدربين، نسعى لتقديم أفضل تجربة طعام لعملائنا."
              : language === "fr"
              ? "Nous sommes un restaurant spécialisé dans la préparation des meilleurs plats traditionnels et modernes. Avec une équipe de chefs professionnels et de personnel formé, nous nous efforçons de fournir la meilleure expérience culinaire à nos clients."
              : "We are a restaurant specializing in serving the finest traditional and modern dishes. With a team of professional chefs and trained staff, we strive to provide the best dining experience to our customers."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold mb-4">
              {language === "ar" ? "مهمتنا" : language === "fr" ? "Notre mission" : "Our Mission"}
            </h3>
            <p className="text-gray-600">
              {language === "ar"
                ? "تقديم طعام عالي الجودة بأسعار معقولة مع خدمة عملاء ممتازة"
                : language === "fr"
                ? "Fournir des aliments de haute qualité à des prix raisonnables avec un excellent service client"
                : "Provide high-quality food at reasonable prices with excellent customer service"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold mb-4">
              {language === "ar" ? "رؤيتنا" : language === "fr" ? "Notre vision" : "Our Vision"}
            </h3>
            <p className="text-gray-600">
              {language === "ar"
                ? "أن نكون أفضل مطعم في المدينة معروفاً بجودة طعامنا وخدمتنا"
                : language === "fr"
                ? "Être le meilleur restaurant de la ville connu pour la qualité de notre nourriture et de notre service"
                : "To be the best restaurant in the city known for the quality of our food and service"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold mb-4">
              {language === "ar" ? "قيمنا" : language === "fr" ? "Nos valeurs" : "Our Values"}
            </h3>
            <p className="text-gray-600">
              {language === "ar"
                ? "الجودة والنزاهة والابتكار والاحترام لعملائنا"
                : language === "fr"
                ? "Qualité, intégrité, innovation et respect de nos clients"
                : "Quality, integrity, innovation, and respect for our customers"}
            </p>
          </div>
        </div>

        <div className="bg-amber-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === "ar" ? "جاهز للطلب؟" : language === "fr" ? "Prêt à commander?" : "Ready to Order?"}
          </h3>
          <Button className="bg-amber-700 hover:bg-amber-800" onClick={() => setLocation("/menu")}>
            {t("viewMenu")}
          </Button>
        </div>
      </div>
    </div>
  );
}

