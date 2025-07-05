"use client";

import { toast } from "sonner";
import {
  insertCustomerSchema,
  type InsertCustomerSchemaType,
  type SelectCustomerSchemaType,
} from "@/zod-schemas/customer";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "@/components/inputs/inputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { StatesArray } from "@/constants/StatesArray";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useAction } from "next-safe-action/hooks";
import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";

type Props = {
  customer?: SelectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;
  // const permObj = getPermissions();
  // const isAuthorized = !isLoading && permObj.permissions.some(perm => perm === "manager" || perm === "admin")

  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    notes: customer?.notes ?? "",
    active: customer?.active ?? true,
  };

  const form = useForm<InsertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast("Success! 🎉", {
        description: data?.message,
        action: {
          label: "OK",
          onClick: () => console.log("ok"),
        },
      });
    },
    onError({ error }) {
      toast("Error", {
        description: "Save Failed",
        action: {
          label: "OK",
          onClick: () => console.log(error),
        },
      });
    },
  });

  async function submitForm(data: InsertCustomerSchemaType) {
    // console.log(data);
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div className="my-4">
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer{" "}
          {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            <SelectWithLabel<InsertCustomerSchemaType>
              fieldTitle={"State"}
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<InsertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : isManager && customer?.id ? (
              <CheckboxWithLabel<InsertCustomerSchemaType>
                fieldTitle="Acitive"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}

            <div className="flex justify-between">
              <Button
                type="submit"
                className="w-3/4"
                variant={"default"}
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
