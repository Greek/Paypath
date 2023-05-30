"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewLink() {
  const session = useSession();

  const [selectedProduct, setSelectedProduct] = useState<string>();

  const { data: products, refetch } = useQuery(["products"], {
    queryFn: async (data) => {
      return await fetch("/api/store/product", {
        body: JSON.stringify({ archive: false }),
      }).then(async (res) => {
        return (await res.json()) as Product[];
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={`xl:flex xl:divide-x max-w-7xl mx-auto`}>
      <div className="flex-1 xl:max-w-lg px-5 sm:px-10 py-10">
        <form>
          <Select
            onValueChange={(e) => {
              setSelectedProduct(e);
            }}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Select a product..." />
            </SelectTrigger>
            <SelectContent>
              {products?.map((product) => {
                return (
                  <SelectItem
                    key={product.id}
                    value={product.id}
                    {...register("server", {
                      required: "select one option",
                    })}
                  >
                    {product.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <button
            onClick={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            fetch lol
          </button>
        </form>
      </div>
    </div>
  );
}
