import { useLanguage, translations } from "@/contexts/LanguageContext";

export default function AdminDashboard() {
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("dashboard")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">{t("orders")}</h3>
          <p className="text-3xl font-bold text-amber-700 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">{t("categories")}</h3>
          <p className="text-3xl font-bold text-amber-700 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">{t("menuManagement")}</h3>
          <p className="text-3xl font-bold text-amber-700 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">{t("reservations")}</h3>
          <p className="text-3xl font-bold text-amber-700 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}

