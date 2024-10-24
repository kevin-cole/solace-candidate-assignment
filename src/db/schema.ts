import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 200 }).notNull(),
  lastName: varchar("last_name", { length: 200 }).notNull(),
  city: varchar("city", { length: 200 }).notNull(),
  degree: varchar("degree", { length: 5 }).notNull(),
  specialties: varchar("specialties", { length: 200 }).array().notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export { advocates };
