import { 
  createInsertSchema, //Validate/parse input data `going into the DB` (e.g., form data, API input)
  createSelectSchema // Validate/parse output data `coming from the DB` (e.g., query results)
} from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod/v4"

export const insertCustomerSchema = createInsertSchema(customers
  , {
    firstName: (schema) => schema.min(1, "First name is required"),
    lastName: (schema) => schema.min(1, "Last name is required"),
    address1: (schema) => schema.min(1, "Address is required"),
    city: (schema) => schema.min(1, "City is required"),
    state: (schema) => schema.min(1, "State name is required"),
    email: (schema) => schema.email("Invalid email address"),
    zip: (schema) => schema.regex(/^[1-9][0-9]{5}$/, "Invalid PIN code. Use 6 digits"),
    phone: (schema) => schema.regex(/^[6-9]\d{9}$/, "Invalid phone number. Use 10 digits starting with 6-9"),
  }
);

export const selectCustomerSchema = createSelectSchema(customers)

export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>
export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>