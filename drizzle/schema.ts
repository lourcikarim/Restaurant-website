import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extended with restaurant management features.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
    role: pgEnum("user_role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Restaurant categories (appetizers, main courses, desserts, drinks, etc.)
 */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameFr: varchar("nameFr", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
  order: integer("order").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Menu items (dishes)
 */
export const menuItems = pgTable("menuItems", {
  id: serial("id").primaryKey(),
  categoryId: integer("categoryId").notNull(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameFr: varchar("nameFr", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
  price: integer("price").notNull(), // Store in cents to avoid decimal issues
  imageUrl: text("imageUrl"),
  isAvailable: boolean("isAvailable").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = typeof menuItems.$inferInsert;

/**
 * Delivery zones with delivery fees
 */
export const deliveryZones = pgTable("deliveryZones", {
  id: serial("id").primaryKey(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameFr: varchar("nameFr", { length: 255 }).notNull(),
  deliveryFee: integer("deliveryFee").notNull(), // In cents
  minOrderAmount: integer("minOrderAmount").default(0), // In cents
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type DeliveryZone = typeof deliveryZones.$inferSelect;
export type InsertDeliveryZone = typeof deliveryZones.$inferInsert;

/**
 * Orders from customers
 */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(), // Human-readable order ID
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  deliveryZoneId: integer("deliveryZoneId").notNull(),
  addressAr: text("addressAr").notNull(),
  addressEn: text("addressEn").notNull(),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  notes: text("notes"),
  subtotal: integer("subtotal").notNull(), // In cents
  deliveryFee: integer("deliveryFee").notNull(), // In cents
  total: integer("total").notNull(), // In cents
    paymentMethod: pgEnum("payment_method", ["cash", "card"]).default("cash"),
    status: pgEnum("order_status", ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"]).default("pending"),
  estimatedDeliveryTime: integer("estimatedDeliveryTime").default(30), // In minutes
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order items (individual dishes in an order)
 */
export const orderItems = pgTable("orderItems", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId").notNull(),
  menuItemId: integer("menuItemId").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(), // Price at time of order (in cents)
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Discount coupons
 */
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
    discountType: pgEnum("discount_type", ["percentage", "fixed"]).notNull(),
  discountValue: integer("discountValue").notNull(), // Percentage (0-100) or fixed amount in cents
  minOrderAmount: integer("minOrderAmount").default(0), // In cents
  maxUsage: integer("maxUsage"),
  usageCount: integer("usageCount").default(0),
  isActive: boolean("isActive").default(true),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;

/**
 * Customer reviews/ratings
 */
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId").notNull(),
  rating: integer("rating").notNull(), // 1-5
  commentAr: text("commentAr"),
  commentEn: text("commentEn"),
  commentFr: text("commentFr"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Restaurant settings and content
 */
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

/**
 * Table reservations
 */
export const tableReservations = pgTable("tableReservations", {
  id: serial("id").primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  numberOfGuests: integer("numberOfGuests").notNull(),
  reservationDate: timestamp("reservationDate").notNull(),
  notes: text("notes"),
    status: pgEnum("reservation_status", ["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TableReservation = typeof tableReservations.$inferSelect;
export type InsertTableReservation = typeof tableReservations.$inferInsert;

