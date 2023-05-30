"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { MutateFunction, useMutation } from "@tanstack/react-query";
import { LucideArrowRight, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductDropdown(
  product: string,
  price: string,
  archived: boolean
) {
  const router = useRouter();
  
  const { mutate: archiveProduct, isLoading } = useMutation(["archiveProduct"], {
    mutationFn: async (data: any) => {
      return await fetch("/api/store/product", {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (res.ok) return await res.json();
        else return null;
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={`sm`}>...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={!!archived || isLoading}
              onClick={(e) => {
                e.preventDefault();

                // @ts-ignore - ion even know
                archiveProduct({ id: product.product, priceId: product.price, archive: archived = !archived });
              }}
            >
              <Trash size={16} className="mr-2 h-4 w-4" />
              {product.archived ? "Archive" : "Unarchive"} product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LucideArrowRight size={16} className="mr-2 h-4 w-4" />
              See links
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
