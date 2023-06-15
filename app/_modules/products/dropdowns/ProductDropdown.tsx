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
import { UseMutateFunction } from "@tanstack/react-query";
import {
  LucideArrowRight,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductPage({
  product,
  archive,
}: {
  product: Product;
  archive: UseMutateFunction;
}) {
  const { push } = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={`sm`}>
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={!!product.archived}
              onClick={(e) => {
                e.preventDefault();

                archive();
              }}
            >
              <Trash size={16} className="mr-2 h-4 w-4" />
              {!product.archived ? "Archive" : "Unarchive"} product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                push(`/d/links/?product=${product.id}`);
              }}
            >
              <LucideArrowRight size={16} className="mr-2 h-4 w-4" />
              See links
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
