import { useLanguage, translations } from "@/contexts/LanguageContext";

export default function Page() {
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Page</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">{t("loading")}</p>
      </div>
    </div>
  );
}
