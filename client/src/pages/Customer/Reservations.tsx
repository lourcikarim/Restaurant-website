import { useLanguage, translations } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function ReservationsPage() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfGuests: 2,
    reservationDate: new Date().toISOString().split("T")[0],
    reservationTime: "19:00",
    notes: "",
  });

  const t = (key: keyof typeof translations.en): string => {
    const langTranslations = translations[language];
    return (langTranslations[key as keyof typeof langTranslations] as string) || key;
  };

  const createReservation = trpc.reservations.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reservationDateTime = new Date(`${formData.reservationDate}T${formData.reservationTime}`);
      await createReservation.mutateAsync({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        numberOfGuests: formData.numberOfGuests,
        reservationDate: reservationDateTime,
        notes: formData.notes,
      });
      alert(t("reservationConfirmed"));
      setLocation("/");
    } catch (error) {
      alert(t("error"));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("makeTableReservation")}</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t("name")}</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("email")}</label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("phone")}</label>
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("numberOfGuests")}</label>
              <input
                type="number"
                min="1"
                required
                value={formData.numberOfGuests}
                onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("reservationDate")}</label>
              <input
                type="date"
                required
                value={formData.reservationDate}
                onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("reservationTime")}</label>
              <input
                type="time"
                required
                value={formData.reservationTime}
                onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">{t("notes")}</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button type="submit" className="flex-1" disabled={createReservation.isPending}>
              {createReservation.isPending ? t("loading") : t("confirm")}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/")}>
              {t("cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

