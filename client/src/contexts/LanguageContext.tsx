import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ar" | "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && ["ar", "en", "fr"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Translation helper
export const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    menu: "القائمة",
    cart: "السلة",
    reservations: "الحجوزات",
    about: "عن الموقع",
    contact: "اتصل بنا",
    admin: "لوحة التحكم",
    logout: "تسجيل الخروج",
    login: "تسجيل الدخول",

    // Home Page
    welcomeToRestaurant: "مرحبا بك في مطعمنا",
    orderNow: "اطلب الآن",
    makeReservation: "احجز طاولة",
    viewMenu: "عرض القائمة",

    // Menu
    categories: "الفئات",
    addToCart: "إضافة للسلة",
    price: "السعر",
    description: "الوصف",
    available: "متاح",
    notAvailable: "غير متاح",

    // Cart
    yourCart: "سلتك",
    emptyCart: "السلة فارغة",
    subtotal: "المجموع الفرعي",
    deliveryFee: "رسوم التوصيل",
    total: "الإجمالي",
    checkout: "الدفع",
    continueShopping: "متابعة التسوق",
    quantity: "الكمية",
    remove: "إزالة",

    // Checkout
    customerInfo: "معلومات العميل",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    deliveryZone: "منطقة التوصيل",
    paymentMethod: "طريقة الدفع",
    cash: "نقدي",
    card: "بطاقة",
    notes: "ملاحظات",
    couponCode: "كود الخصم",
    applyCoupon: "تطبيق الخصم",
    placeOrder: "تأكيد الطلب",

    // Order Confirmation
    orderConfirmed: "تم تأكيد الطلب",
    orderNumber: "رقم الطلب",
    estimatedDelivery: "التوصيل المتوقع",
    minutes: "دقائق",
    trackOrder: "تتبع الطلب",
    orderStatus: "حالة الطلب",
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    preparing: "قيد التحضير",
    ready: "جاهز",
    delivered: "تم التوصيل",
    cancelled: "ملغى",

    // Reservations
    makeTableReservation: "احجز طاولة",
    numberOfGuests: "عدد الضيوف",
    reservationDate: "تاريخ الحجز",
    reservationTime: "وقت الحجز",
    reservationConfirmed: "تم تأكيد الحجز",

    // Admin
    dashboard: "لوحة التحكم",
    orders: "الطلبات",
    menuManagement: "إدارة القائمة",
    categoryManagement: "إدارة الفئات",
    deliveryZones: "مناطق التوصيل",
    coupons: "الخصومات",
    settings: "الإعدادات",
    addNew: "إضافة جديد",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",

    // Messages
    success: "نجح",
    error: "خطأ",
    loading: "جاري التحميل",
    noResults: "لا توجد نتائج",
  },
  en: {
    // Navigation
    home: "Home",
    menu: "Menu",
    cart: "Cart",
    reservations: "Reservations",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    logout: "Logout",
    login: "Login",

    // Home Page
    welcomeToRestaurant: "Welcome to Our Restaurant",
    orderNow: "Order Now",
    makeReservation: "Make a Reservation",
    viewMenu: "View Menu",

    // Menu
    categories: "Categories",
    addToCart: "Add to Cart",
    price: "Price",
    description: "Description",
    available: "Available",
    notAvailable: "Not Available",

    // Cart
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    total: "Total",
    checkout: "Checkout",
    continueShopping: "Continue Shopping",
    quantity: "Quantity",
    remove: "Remove",

    // Checkout
    customerInfo: "Customer Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    deliveryZone: "Delivery Zone",
    paymentMethod: "Payment Method",
    cash: "Cash",
    card: "Card",
    notes: "Notes",
    couponCode: "Coupon Code",
    applyCoupon: "Apply Coupon",
    placeOrder: "Place Order",

    // Order Confirmation
    orderConfirmed: "Order Confirmed",
    orderNumber: "Order Number",
    estimatedDelivery: "Estimated Delivery",
    minutes: "minutes",
    trackOrder: "Track Order",
    orderStatus: "Order Status",
    pending: "Pending",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready: "Ready",
    delivered: "Delivered",
    cancelled: "Cancelled",

    // Reservations
    makeTableReservation: "Make a Table Reservation",
    numberOfGuests: "Number of Guests",
    reservationDate: "Reservation Date",
    reservationTime: "Reservation Time",
    reservationConfirmed: "Reservation Confirmed",

    // Admin
    dashboard: "Dashboard",
    orders: "Orders",
    menuManagement: "Menu Management",
    categoryManagement: "Category Management",
    deliveryZones: "Delivery Zones",
    coupons: "Coupons",
    settings: "Settings",
    addNew: "Add New",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",

    // Messages
    success: "Success",
    error: "Error",
    loading: "Loading",
    noResults: "No results found",
  },
  fr: {
    // Navigation
    home: "Accueil",
    menu: "Menu",
    cart: "Panier",
    reservations: "Réservations",
    about: "À propos",
    contact: "Contact",
    admin: "Admin",
    logout: "Déconnexion",
    login: "Connexion",

    // Home Page
    welcomeToRestaurant: "Bienvenue dans notre restaurant",
    orderNow: "Commander maintenant",
    makeReservation: "Faire une réservation",
    viewMenu: "Voir le menu",

    // Menu
    categories: "Catégories",
    addToCart: "Ajouter au panier",
    price: "Prix",
    description: "Description",
    available: "Disponible",
    notAvailable: "Non disponible",

    // Cart
    yourCart: "Votre panier",
    emptyCart: "Votre panier est vide",
    subtotal: "Sous-total",
    deliveryFee: "Frais de livraison",
    total: "Total",
    checkout: "Passer la commande",
    continueShopping: "Continuer vos achats",
    quantity: "Quantité",
    remove: "Supprimer",

    // Checkout
    customerInfo: "Informations client",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse",
    deliveryZone: "Zone de livraison",
    paymentMethod: "Méthode de paiement",
    cash: "Espèces",
    card: "Carte",
    notes: "Notes",
    couponCode: "Code de coupon",
    applyCoupon: "Appliquer le coupon",
    placeOrder: "Confirmer la commande",

    // Order Confirmation
    orderConfirmed: "Commande confirmée",
    orderNumber: "Numéro de commande",
    estimatedDelivery: "Livraison estimée",
    minutes: "minutes",
    trackOrder: "Suivre la commande",
    orderStatus: "Statut de la commande",
    pending: "En attente",
    confirmed: "Confirmé",
    preparing: "En préparation",
    ready: "Prêt",
    delivered: "Livré",
    cancelled: "Annulé",

    // Reservations
    makeTableReservation: "Faire une réservation de table",
    numberOfGuests: "Nombre de convives",
    reservationDate: "Date de réservation",
    reservationTime: "Heure de réservation",
    reservationConfirmed: "Réservation confirmée",

    // Admin
    dashboard: "Tableau de bord",
    orders: "Commandes",
    menuManagement: "Gestion du menu",
    categoryManagement: "Gestion des catégories",
    deliveryZones: "Zones de livraison",
    coupons: "Coupons",
    settings: "Paramètres",
    addNew: "Ajouter nouveau",
    edit: "Modifier",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    confirm: "Confirmer",

    // Messages
    success: "Succès",
    error: "Erreur",
    loading: "Chargement",
    noResults: "Aucun résultat trouvé",
  },
};

export function t(key: keyof typeof translations.en, lang: Language = "en"): string {
  const langTranslations = translations[lang];
  return (langTranslations[key as keyof typeof langTranslations] as string) || key;
}

