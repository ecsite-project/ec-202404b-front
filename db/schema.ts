import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const userTable = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    jwt: text("jwt").notNull(),
  });
  
  export const sessionTable = sqliteTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    expiresAt: integer("expires_at").notNull(),
  });
  