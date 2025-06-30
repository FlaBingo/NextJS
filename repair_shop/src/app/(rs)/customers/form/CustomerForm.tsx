"use client";

import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer";

type Props = {
  customer?: selectCustomerSchemaType,
}

export default function CustomerForm({customer}: Props) {
  const defaultValues: insertCustomerSchemaType = {
    // id: customer?.id || 0,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    address1: customer?.address1 || "",
    address2: customer?.address2 || "",
    city: customer?.city || "",
    state: customer?.state || "",
    zip: customer?.zip || "",
    country: customer?.country || "",
    createdAt: customer?.createdAt || undefined,
    updatedAt: customer?.updatedAt || undefined,
  }
  
}