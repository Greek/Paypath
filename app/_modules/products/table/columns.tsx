"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "customers",
    header: "Customers",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
