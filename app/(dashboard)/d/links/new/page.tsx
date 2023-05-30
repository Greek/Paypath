"use client";

import { LinkModel } from "@/app/_schemas";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Product } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewLink() {
  const session = useSession();

  const [selectedProduct, setSelectedProduct] = useState<string>();

  const { data: products, refetch } = useQuery({
    queryFn: async () => {
      return await fetch("/api/store/products").then(async (res) => {
        return (await res.json()) as Product[];
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Link>({ resolver: zodResolver(LinkModel)});

  return (
    <div className={`xl:flex xl:divide-x max-w-7xl mx-auto`}>
      <div className="flex-1 xl:max-w-lg px-5 sm:px-10 py-10">
        <form className={"space-y-2"}>
          <Label>Product</Label>
          <Select
            onValueChange={(e) => {
              setSelectedProduct(e);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a product..." />
            </SelectTrigger>
            <SelectContent>
              {products?.map((product) => {
                return (
                  <SelectItem
                    key={product.id}
                    value={product.id}
                    {...register("nickname", {
                      required: "select one option",
                    })}
                  >
                    {product.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Label>Nickname</Label>
          <Input
            placeholder="Link nickname..."
            {...register("nickname")}
          ></Input>
          <button
            onClick={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            Create Link
          </button>
        </form>
      </div>
    </div>
  );
}
