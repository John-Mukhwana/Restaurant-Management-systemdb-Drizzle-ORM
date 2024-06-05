

// import { pgTable, serial,text,varchar,integer } from 'drizzle-orm/pg-core';
// //user table
// export const userTable = pgTable( "user",{
//      id:serial("id").primaryKey(),
//      fullname:text("full_name"),
//      phone:varchar("phone", {length: 100}),
//      address:varchar("address", {length: 100}),
//      score:integer("score"),

// })

// export const profileTable = pgTable( "profile",{

//      id:serial("id").primaryKey(),
//      bio:varchar("bio", {length: 256}),
//      userId:integer("user_id").notNull().references(()=>userTable.id, {onDelete:"cascade"}),
// });

import { pgTable, serial, text, varchar, integer, boolean, decimal, timestamp } from 'drizzle-orm/pg-core';

// Users Table
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contactPhone: varchar("contact_phone", { length: 100 }).notNull(),
  phoneVerified: boolean("phone_verified").notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  emailVerified: boolean("email_verified").notNull(),
  confirmationCode: varchar("confirmation_code", { length: 100 }),
  password: varchar("password", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// State Table
export const stateTable = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
});

// City Table
export const cityTable = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  stateId: integer("state_id").notNull().references(() => stateTable.id, { onDelete: "cascade" }),
});

// Address Table
export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  streetAddress1: varchar("street_address_1", { length: 100 }).notNull(),
  streetAddress2: varchar("street_address_2", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  deliveryInstructions: varchar("delivery_instructions", { length: 256 }),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  cityId: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Category Table
export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

// Restaurant Table
export const restaurantTable = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  streetAddress: varchar("street_address", { length: 100 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  cityId: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// RestaurantOwner Table
export const restaurantOwnerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
  ownerId: integer("owner_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
});

// MenuItem Table
export const menuItemTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  restaurantId: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: decimal("price").notNull(),
  active: boolean("active").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Orders Table
export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
  estimatedDeliveryTime: timestamp("estimated_delivery_time").notNull(),
  actualDeliveryTime: timestamp("actual_delivery_time"),
  deliveryAddressId: integer("delivery_address_id").notNull().references(() => addressTable.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  driverId: integer("driver_id").references(() => driverTable.id, { onDelete: "cascade" }),
  price: decimal("price").notNull(),
  discount: decimal("discount"),
  finalPrice: decimal("final_price").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// OrderMenuItem Table
export const orderMenuItemTable = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  menuItemId: integer("menu_item_id").notNull().references(() => menuItemTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  itemPrice: decimal("item_price").notNull(),
  price: decimal("price").notNull(),
  comment: text("comment"),
  
});

// StatusCatalog Table
export const statusCatalogTable = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

// OrderStatus Table
export const orderStatusTable = pgTable("order_status", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  statusCatalogId: integer("status_catalog_id").notNull().references(() => statusCatalogTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull(),
});

// Comment Table
export const commentTable = pgTable("comment", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  commentText: text("comment_text").notNull(),
  isComplaint: boolean("is_complaint").notNull(),
  isPraise: boolean("is_praise").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Driver Table
export const driverTable = pgTable("driver", {
  id: serial("id").primaryKey(),
  carMake: varchar("car_make", { length: 100 }).notNull(),
  carModel: varchar("car_model", { length: 100 }).notNull(),
  carYear: integer("car_year").notNull(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  online: boolean("online").notNull(),
  delivering: boolean("delivering").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
