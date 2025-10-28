import { eq, desc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  InsertUser,
  users,
  categories,
  menuItems,
  deliveryZones,
  orders,
  orderItems,
  coupons,
  reviews,
  settings,
  tableReservations,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
if (!_db && process.env.DATABASE_URL) {
	    try {
			const pool = new Pool({
				connectionString: process.env.DATABASE_URL,
			});
			_db = drizzle(pool);
	    } catch (error) {
	      console.warn("[Database] Failed to connect:", error);
	      _db = null;
	    }
	  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

await db.insert(users).values(values).onConflictDoUpdate({
			target: users.openId,
	      set: updateSet,
	    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== CATEGORIES ====================

export async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(categories.order);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(categories).where(eq(categories.id, id));
  return result.length > 0 ? result[0] : null;
}

export async function createCategory(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(categories).values(data);
  return result;
}

export async function updateCategory(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(categories).set(data).where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(categories).where(eq(categories.id, id));
}

// ==================== MENU ITEMS ====================

export async function getMenuItems(categoryId?: number) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(menuItems.isAvailable, true)];
  if (categoryId) {
    conditions.push(eq(menuItems.categoryId, categoryId));
  }

  return db
    .select()
    .from(menuItems)
    .where(and(...conditions))
    .orderBy(menuItems.order);
}

export async function getMenuItemById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(menuItems).where(eq(menuItems.id, id));
  return result.length > 0 ? result[0] : null;
}

export async function createMenuItem(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(menuItems).values(data);
}

export async function updateMenuItem(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(menuItems).set(data).where(eq(menuItems.id, id));
}

export async function deleteMenuItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(menuItems).where(eq(menuItems.id, id));
}

// ==================== DELIVERY ZONES ====================

export async function getDeliveryZones() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(deliveryZones)
    .where(eq(deliveryZones.isActive, true));
}

export async function getDeliveryZoneById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(deliveryZones)
    .where(eq(deliveryZones.id, id));
  return result.length > 0 ? result[0] : null;
}

export async function createDeliveryZone(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(deliveryZones).values(data);
}

export async function updateDeliveryZone(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(deliveryZones).set(data).where(eq(deliveryZones.id, id));
}

export async function deleteDeliveryZone(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(deliveryZones).where(eq(deliveryZones.id, id));
}

// ==================== ORDERS ====================

export async function createOrder(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orders).values(data);
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(orders).where(eq(orders.id, id));
  return result.length > 0 ? result[0] : null;
}

export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber));
  return result.length > 0 ? result[0] : null;
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrder(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(orders).set(data).where(eq(orders.id, id));
}

// ==================== ORDER ITEMS ====================

export async function createOrderItem(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orderItems).values(data);
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// ==================== COUPONS ====================

export async function getCouponByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(coupons)
    .where(and(eq(coupons.code, code.toUpperCase()), eq(coupons.isActive, true)));
  return result.length > 0 ? result[0] : null;
}

export async function getAllCoupons() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(coupons).orderBy(desc(coupons.createdAt));
}

export async function createCoupon(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(coupons).values(data);
}

export async function updateCoupon(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(coupons).set(data).where(eq(coupons.id, id));
}

export async function deleteCoupon(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(coupons).where(eq(coupons.id, id));
}

// ==================== REVIEWS ====================

export async function createReview(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reviews).values(data);
}

export async function getReviewsByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.orderId, orderId));
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

// ==================== SETTINGS ====================

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(settings).where(eq(settings.key, key));
  return result.length > 0 ? result[0] : null;
}

export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getSetting(key);
  if (existing) {
    return db.update(settings).set({ value }).where(eq(settings.key, key));
  } else {
    return db.insert(settings).values({ key, value });
  }
}

// ==================== TABLE RESERVATIONS ====================

export async function createTableReservation(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(tableReservations).values(data);
}

export async function getTableReservations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tableReservations).orderBy(desc(tableReservations.reservationDate));
}

export async function updateTableReservation(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(tableReservations).set(data).where(eq(tableReservations.id, id));
}

export async function deleteTableReservation(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(tableReservations).where(eq(tableReservations.id, id));
}

