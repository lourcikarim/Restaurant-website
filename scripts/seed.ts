import {
  createCategory,
  createMenuItem,
  createDeliveryZone,
  createCoupon,
} from "../server/db";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Create Categories
    console.log("📂 Creating categories...");
    const categories = [
      {
        nameAr: "المقبلات",
        nameEn: "Appetizers",
        nameFr: "Entrées",
        descriptionAr: "أطباق خفيفة لبدء وجبتك",
        descriptionEn: "Light dishes to start your meal",
        descriptionFr: "Plats légers pour commencer votre repas",
        order: 1,
      },
      {
        nameAr: "الأطباق الرئيسية",
        nameEn: "Main Courses",
        nameFr: "Plats Principaux",
        descriptionAr: "أطباق رئيسية لذيذة ومشبعة",
        descriptionEn: "Delicious and filling main dishes",
        descriptionFr: "Plats principaux délicieux et savoureux",
        order: 2,
      },
      {
        nameAr: "الحلويات",
        nameEn: "Desserts",
        nameFr: "Desserts",
        descriptionAr: "حلويات لذيذة لإنهاء وجبتك",
        descriptionEn: "Delicious desserts to end your meal",
        descriptionFr: "Délicieux desserts pour terminer votre repas",
        order: 3,
      },
      {
        nameAr: "المشروبات",
        nameEn: "Beverages",
        nameFr: "Boissons",
        descriptionAr: "مشروبات منعشة ولذيذة",
        descriptionEn: "Refreshing and delicious beverages",
        descriptionFr: "Boissons rafraîchissantes et délicieuses",
        order: 4,
      },
    ];

    for (const category of categories) {
      await createCategory(category);
    }
    console.log("✅ Categories created");

    // Create Menu Items
    console.log("🍽️ Creating menu items...");
    const menuItems = [
      {
        categoryId: 1,
        nameAr: "حمص بالطحينة",
        nameEn: "Hummus",
        nameFr: "Houmous",
        descriptionAr: "حمص ناعم مع الطحينة والليمون",
        descriptionEn: "Smooth chickpea puree with tahini and lemon",
        descriptionFr: "Purée de pois chiches lisse avec tahini et citron",
        price: 500, // $5.00
        order: 1,
      },
      {
        categoryId: 1,
        nameAr: "بابا غنوج",
        nameEn: "Baba Ghanoush",
        nameFr: "Baba Ghanoush",
        descriptionAr: "باذنجان مشوي مع الطحينة والليمون",
        descriptionEn: "Roasted eggplant with tahini and lemon",
        descriptionFr: "Aubergine rôtie avec tahini et citron",
        price: 500,
        order: 2,
      },
      {
        categoryId: 2,
        nameAr: "شاورما الدجاج",
        nameEn: "Chicken Shawarma",
        nameFr: "Shawarma Poulet",
        descriptionAr: "دجاج مشوي مع الخضار والصلصة",
        descriptionEn: "Grilled chicken with vegetables and sauce",
        descriptionFr: "Poulet grillé avec légumes et sauce",
        price: 1200,
        order: 1,
      },
      {
        categoryId: 2,
        nameAr: "كباب اللحم",
        nameEn: "Beef Kebab",
        nameFr: "Kebab Boeuf",
        descriptionAr: "لحم مشوي مع البهارات والخضار",
        descriptionEn: "Grilled meat with spices and vegetables",
        descriptionFr: "Viande grillée avec épices et légumes",
        price: 1500,
        order: 2,
      },
      {
        categoryId: 3,
        nameAr: "بقلاوة",
        nameEn: "Baklava",
        nameFr: "Baklava",
        descriptionAr: "حلوى بالعجين والفستق والعسل",
        descriptionEn: "Pastry with pistachios and honey",
        descriptionFr: "Pâtisserie avec pistaches et miel",
        price: 400,
        order: 1,
      },
      {
        categoryId: 3,
        nameAr: "أم علي",
        nameEn: "Um Ali",
        nameFr: "Um Ali",
        descriptionAr: "حلوى تقليدية مع المكسرات والحليب",
        descriptionEn: "Traditional sweet with nuts and milk",
        descriptionFr: "Sucrerie traditionnelle avec noix et lait",
        price: 350,
        order: 2,
      },
      {
        categoryId: 4,
        nameAr: "عصير برتقال",
        nameEn: "Orange Juice",
        nameFr: "Jus d'Orange",
        descriptionAr: "عصير برتقال طازج",
        descriptionEn: "Fresh orange juice",
        descriptionFr: "Jus d'orange frais",
        price: 250,
        order: 1,
      },
      {
        categoryId: 4,
        nameAr: "قهوة عربية",
        nameEn: "Arabic Coffee",
        nameFr: "Café Arabe",
        descriptionAr: "قهوة عربية تقليدية",
        descriptionEn: "Traditional Arabic coffee",
        descriptionFr: "Café arabe traditionnel",
        price: 200,
        order: 2,
      },
    ];

    for (const item of menuItems) {
      await createMenuItem(item);
    }
    console.log("✅ Menu items created");

    // Create Delivery Zones
    console.log("🚚 Creating delivery zones...");
    const deliveryZones = [
      {
        nameAr: "المركز",
        nameEn: "Downtown",
        nameFr: "Centre-ville",
        deliveryFee: 300, // $3.00
        minOrderAmount: 1000, // $10.00
      },
      {
        nameAr: "الضواحي",
        nameEn: "Suburbs",
        nameFr: "Banlieue",
        deliveryFee: 500, // $5.00
        minOrderAmount: 1500, // $15.00
      },
      {
        nameAr: "المناطق البعيدة",
        nameEn: "Far Areas",
        nameFr: "Zones Éloignées",
        deliveryFee: 800, // $8.00
        minOrderAmount: 2000, // $20.00
      },
    ];

    for (const zone of deliveryZones) {
      await createDeliveryZone(zone);
    }
    console.log("✅ Delivery zones created");

    // Create Coupons
    console.log("🎟️ Creating coupons...");
    const coupons = [
      {
        code: "WELCOME10",
        descriptionAr: "خصم 10% للعملاء الجدد",
        descriptionEn: "10% discount for new customers",
        descriptionFr: "10% de réduction pour les nouveaux clients",
        discountType: "percentage" as const,
        discountValue: 10,
        minOrderAmount: 500,
        maxUsage: 100,
        isActive: true,
      },
      {
        code: "SUMMER20",
        descriptionAr: "خصم 20% على الطلبات الصيفية",
        descriptionEn: "20% discount on summer orders",
        descriptionFr: "20% de réduction sur les commandes d'été",
        discountType: "percentage" as const,
        discountValue: 20,
        minOrderAmount: 2000,
        maxUsage: 50,
        isActive: true,
      },
      {
        code: "SAVE5",
        descriptionAr: "خصم 5 دولار على الطلب",
        descriptionEn: "$5 off your order",
        descriptionFr: "5$ de réduction sur votre commande",
        discountType: "fixed" as const,
        discountValue: 500,
        minOrderAmount: 1500,
        maxUsage: 200,
        isActive: true,
      },
    ];

    for (const coupon of coupons) {
      await createCoupon(coupon);
    }
    console.log("✅ Coupons created");

    console.log("🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();

