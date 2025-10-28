import { useLanguage, translations } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useLocation, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/order-confirmation/:orderNumber");
  const orderNumber = params?.orderNumber as string;

  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  const { data: order, isLoading } = trpc.orders.get.useQuery(orderNumber || "", {
    enabled: !!orderNumber,
  });

  if (!match || !orderNumber) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>{t("error")}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">{t("loading")}</div>;
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-green-600">{t("orderConfirmed")}</h1>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="mb-6">
            <p className="text-gray-600 mb-2">{t("orderNumber")}</p>
            <p className="text-3xl font-bold text-amber-700">{order.orderNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">{t("customerInfo")}</p>
              <p className="font-bold">{order.customerName}</p>
              <p className="text-sm">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-gray-600">{t("estimatedDelivery")}</p>
              <p className="font-bold">{order.estimatedDeliveryTime} {t("minutes")}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between mb-2">
              <span>{t("subtotal")}</span>
              <span>${(order.subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>{t("deliveryFee")}</span>
              <span>${(order.deliveryFee / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>{t("total")}</span>
              <span>${(order.total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full" onClick={() => setLocation("/")}>
            {t("home")}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setLocation("/menu")}>
            {t("continueShopping")}
          </Button>
        </div>
      </div>
    </div>
  );
}

