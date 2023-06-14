"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import ProductDropdown from "./ProductDropdown";
import { formatPrice } from "@/app/modules/store/LinkPurchasePage";

export default function ProductPage(context: { params: { id: string } }) {
  const { data: product, refetch } = useQuery(["product"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/products/${context.params.id}`)).data
        .product as Product;
    },
  });

  const { mutate: archiveProduct, isLoading } = useMutation(
    ["archiveProduct"],
    {
      mutationFn: async (input: any) => {
        return await axios.patch(`/api/store/products/${context.params.id}`);
      },
      onSuccess() {
        refetch();
      },
    }
  );

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <div className="flex flex-col">
            {product && (
              <>
                <span className="font-semibold text-2xl lg:text-3xl items-center">
                  {product.name}
                  <Badge>{!product.archived ? "Active" : "Archived"}</Badge>
                </span>
                <span className="text-muted-foreground ">
                  sold for {formatPrice(product.price)}
                </span>
                <div className={`space-x-2 mt-3`}>
                  <Button size={"sm"} disabled={!!product.archived}>
                    Create Link
                  </Button>
                  <ProductDropdown product={product} archive={archiveProduct} />
                </div>
              </>
            )}
          </div>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
        {product && (
          <Card>
            <CardHeader className={`pb-5`}>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className={`py-3 space-y-2 text-left`}>
              <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Name</p>
                <p>{product.name}</p>
              </div>
              <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Description</p>
                {product.description ? (
                  product.description
                ) : (
                  <p className="text-muted-foreground">No description..</p>
                )}
              </div>
              <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Price</p>
                <p>{product.price}</p>
              </div>{" "}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
