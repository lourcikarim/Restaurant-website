import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getDeliveryZones,
  getDeliveryZoneById,
  createDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone,
  createOrder,
  getOrderById,
  getOrderByNumber,
  getAllOrders,
  updateOrder,
  createOrderItem,
  getOrderItems,
  getCouponByCode,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  createReview,
  getReviewsByOrderId,
  getAllReviews,
  getSetting,
  setSetting,
  createTableReservation,
  getTableReservations,
  updateTableReservation,
  deleteTableReservation,
} from "./db";

// Helper to generate unique order numbers
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${timestamp}${random}`;
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== CATEGORIES ====================
  categories: router({
    list: publicProcedure.query(async () => {
      return getCategories();
    }),

    get: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getCategoryById(input);
    }),

    create: protectedProcedure
      .input(
        z.object({
          nameAr: z.string(),
          nameEn: z.string(),
          nameFr: z.string(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionFr: z.string().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createCategory(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          nameAr: z.string().optional(),
          nameEn: z.string().optional(),
          nameFr: z.string().optional(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionFr: z.string().optional(),
          order: z.number().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateCategory(id, data);
      }),

    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return deleteCategory(input);
      }),
  }),

  // ==================== MENU ITEMS ====================
  menuItems: router({
    list: publicProcedure
      .input(z.number().optional())
      .query(async ({ input }) => {
        return getMenuItems(input);
      }),

    get: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getMenuItemById(input);
    }),

    create: protectedProcedure
      .input(
        z.object({
          categoryId: z.number(),
          nameAr: z.string(),
          nameEn: z.string(),
          nameFr: z.string(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionFr: z.string().optional(),
          price: z.number(),
          imageUrl: z.string().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createMenuItem(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          categoryId: z.number().optional(),
          nameAr: z.string().optional(),
          nameEn: z.string().optional(),
          nameFr: z.string().optional(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionFr: z.string().optional(),
          price: z.number().optional(),
          imageUrl: z.string().optional(),
          isAvailable: z.boolean().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateMenuItem(id, data);
      }),

    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return deleteMenuItem(input);
      }),
  }),

  // ==================== DELIVERY ZONES ====================
  deliveryZones: router({
    list: publicProcedure.query(async () => {
      return getDeliveryZones();
    }),

    get: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getDeliveryZoneById(input);
    }),

    create: protectedProcedure
      .input(
        z.object({
          nameAr: z.string(),
          nameEn: z.string(),
          nameFr: z.string(),
          deliveryFee: z.number(),
          minOrderAmount: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createDeliveryZone(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          nameAr: z.string().optional(),
          nameEn: z.string().optional(),
          nameFr: z.string().optional(),
          deliveryFee: z.number().optional(),
          minOrderAmount: z.number().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateDeliveryZone(id, data);
      }),

    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return deleteDeliveryZone(input);
      }),
  }),

  // ==================== ORDERS ====================
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllOrders();
    }),

    get: publicProcedure.input(z.string()).query(async ({ input }) => {
      return getOrderByNumber(input);
    }),

    create: publicProcedure
      .input(
        z.object({
          customerName: z.string(),
          customerEmail: z.string().optional(),
          customerPhone: z.string(),
          deliveryZoneId: z.number(),
          addressAr: z.string(),
          addressEn: z.string(),
          latitude: z.string().optional(),
          longitude: z.string().optional(),
          notes: z.string().optional(),
          items: z.array(
            z.object({
              menuItemId: z.number(),
              quantity: z.number(),
              price: z.number(),
              notes: z.string().optional(),
            })
          ),
          subtotal: z.number(),
          deliveryFee: z.number(),
          total: z.number(),
          paymentMethod: z.enum(["cash", "card"]),
          estimatedDeliveryTime: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const orderNumber = generateOrderNumber();
        const {
          items,
          subtotal,
          deliveryFee,
          total,
          paymentMethod,
          estimatedDeliveryTime,
          ...orderData
        } = input;

        const orderResult = await createOrder({
          ...orderData,
          orderNumber,
          subtotal,
          deliveryFee,
          total,
          paymentMethod,
          estimatedDeliveryTime: estimatedDeliveryTime || 30,
        });

        // Get the order ID from the database
        const createdOrder = await getOrderByNumber(orderNumber);
        if (!createdOrder) {
          throw new Error("Failed to create order");
        }

        // Create order items
        for (const item of items) {
          await createOrderItem({
            orderId: createdOrder.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
            notes: item.notes,
          });
        }

        return { orderNumber, orderId: createdOrder.id };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z
            .enum(["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"])
            .optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateOrder(id, data);
      }),
  }),

  // ==================== COUPONS ====================
  coupons: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllCoupons();
    }),

    validate: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const coupon = await getCouponByCode(input);
        if (!coupon) {
          return { valid: false };
        }

        // Check if expired
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          return { valid: false };
        }

        // Check if max usage reached
        if (coupon.maxUsage && (coupon.usageCount ?? 0) >= coupon.maxUsage) {
          return { valid: false };
        }

        return {
          valid: true,
          coupon,
        };
      }),

    create: protectedProcedure
      .input(
        z.object({
          code: z.string(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionFr: z.string().optional(),
          discountType: z.enum(["percentage", "fixed"]),
          discountValue: z.number(),
          minOrderAmount: z.number().optional(),
          maxUsage: z.number().optional(),
          expiresAt: z.date().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createCoupon(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          code: z.string().optional(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionFr: z.string().optional(),
          discountType: z.enum(["percentage", "fixed"]).optional(),
          discountValue: z.number().optional(),
          minOrderAmount: z.number().optional(),
          maxUsage: z.number().optional(),
          isActive: z.boolean().optional(),
          expiresAt: z.date().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateCoupon(id, data);
      }),

    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return deleteCoupon(input);
      }),
  }),

  // ==================== REVIEWS ====================
  reviews: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllReviews();
    }),

    getByOrder: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getReviewsByOrderId(input);
      }),

    create: publicProcedure
      .input(
        z.object({
          orderId: z.number(),
          rating: z.number().min(1).max(5),
          commentAr: z.string().optional(),
          commentEn: z.string().optional(),
          commentFr: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createReview(input);
      }),
  }),

  // ==================== TABLE RESERVATIONS ====================
  reservations: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getTableReservations();
    }),

    create: publicProcedure
      .input(
        z.object({
          customerName: z.string(),
          customerEmail: z.string().optional(),
          customerPhone: z.string(),
          numberOfGuests: z.number(),
          reservationDate: z.date(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createTableReservation(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return updateTableReservation(id, data);
      }),

    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return deleteTableReservation(input);
      }),
  }),

  // ==================== SETTINGS ====================
  settings: router({
    get: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return getSetting(input);
      }),

    set: protectedProcedure
      .input(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return setSetting(input.key, input.value);
      }),
  }),
});

export type AppRouter = typeof appRouter;

