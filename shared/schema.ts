import { pgTable, text, serial, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: real("price").notNull(),
  salePrice: real("sale_price"),
  categoryId: integer("category_id").notNull(),
  featured: boolean("featured").default(false),
  bestSeller: boolean("best_seller").default(false),
  newArrival: boolean("new_arrival").default(false),
  image: text("image").notNull(),
  inStock: boolean("in_stock").default(true),
  colors: text("colors").array(),
  sizes: text("sizes").array(),
});

// Wishlist
export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  productId: integer("product_id").notNull(),
});

// Cart
export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  size: text("size"),
  color: text("color"),
});

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create Schemas
export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertWishlistSchema = createInsertSchema(wishlist).omit({
  id: true,
});

export const insertCartSchema = createInsertSchema(cart).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Types
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type WishlistItem = typeof wishlist.$inferSelect;
export type InsertWishlistItem = z.infer<typeof insertWishlistSchema>;

export type CartItem = typeof cart.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
