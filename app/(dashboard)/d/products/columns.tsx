"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Store = {
  id: string;
  name: string;
  price: number;
  integration: "discord";
  customers: number;
};

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "integration",
    header: "Integrations",
  },
];
