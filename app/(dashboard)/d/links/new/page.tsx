"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, Product } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TinyErrorMessage } from "../../products/page";
import { useRouter } from "next/navigation";

export default function NewLink() {
  const { push } = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [storeId, setStoreId] = useState<string>();

  const { data: products } = useQuery({
    queryFn: async () => {
      return await fetch("/api/store/products").then(async (res) => {
        return (await res.json()) as Product[];
      });
    },
    onSuccess(d) {
      setStoreId(d[0].storeId);
    },
  });

  const {
    mutate: createLink,
    isLoading: isCreatingLink,
  } = useMutation(["createLink"], {
    mutationFn: async (data: Link) =>
      await fetch("/api/store/links", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(async (r) => {
        return (await r.json()) as { success: boolean; link: Link };
      }),
    onSuccess(data) {
      push(`/d/links/${data?.link?.id}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (d: any) => {
    createLink({ ...d, productId: selectedProduct, storeId: storeId });
  };

  return (
    <>
      <Head>
        <title>Hello world</title>
      </Head>
      <div className={`xl:flex xl:divide-x max-w-7xl mx-auto`}>
        <div className="flex-1 xl:max-w-lg px-5 sm:px-10 py-10">
          <form className={"space-y-2"} onSubmit={handleSubmit(submit)}>
            <Label>Product</Label>
            <Select
              onValueChange={(e) => {
                setSelectedProduct(e);
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product..." />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => {
                  return (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <TinyErrorMessage>
              {errors.productId?.message as string}
            </TinyErrorMessage>
            <Label>Nickname</Label>
            <Input
              placeholder="Link nickname..."
              {...register("nickname")}
            ></Input>
            <TinyErrorMessage>
              {errors.nickname?.message as string}
            </TinyErrorMessage>
            <Button type="submit" disabled={!!isCreatingLink}>Create Link</Button>
          </form>
        </div>
      </div>
    </>
  );
}
