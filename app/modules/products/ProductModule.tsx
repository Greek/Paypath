"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { License, Product } from "@prisma/client";
import { formatPrice } from "@/app/modules/store/LinkPurchasePage";
import ProductDropdown from "./dropdowns/ProductDropdown";
import { LinkIcon } from "lucide-react";
import { ExternalLinkTo } from "@/components/externallink";

export default function ProductModule(context: { params: { id: string } }) {
  const { data: product, refetch } = useQuery(["product"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/products/${context.params.id}`)).data
        .product as Product & { licenses: License[] };
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
                <div
                  className={`space-x-2 mt-3 align-middle items-center justify-center`}
                >
                  <Button size={"sm"} disabled={!!product.archived}>
                    <LinkIcon size={16} className={`mr-2`} /> Create Link
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
            <CardContent className={`py-3 space-y-2 text-left text-sm`}>
              <div className={`grid grid-cols-3`}>
                <p className={`text-muted-foreground`}>Name</p>
                <p>{product.name}</p>
              </div>
              <div className={`grid grid-cols-3`}>
                <p className={`text-muted-foreground`}>Description</p>
                {product.description ? (
                  product.description
                ) : (
                  <p className="text-muted-foreground">No description</p>
                )}
              </div>
              <div className={`grid grid-cols-3`}>
                <p className={`text-muted-foreground`}>Price</p>
                <p>{formatPrice(product.price)}</p>
              </div>
              {/* <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Transfers</p>
                <p>{product.price}</p>
              </div> */}
              <div className={`grid grid-cols-3`}>
                <p className={`text-muted-foreground`}>Customers</p>
                <div className="flex flex-row align-middle">
                  {product.licenses.length > 1 ? (
                    <>
                      <ExternalLinkTo
                        href="/"
                        className={`${
                          product.licenses.length < 1
                            ? "text-muted-foreground"
                            : null
                        }`}
                      >
                        {product.licenses.length} customer
                        {product.licenses.length <= 1 ? "s" : null}
                      </ExternalLinkTo>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No customers</p>
                  )}
                </div>
              </div>
              <div className={`grid grid-cols-3`}>
                <p className={`text-muted-foreground`}>ID</p>
                <p>{product.id}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
