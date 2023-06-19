"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { License, Product } from "@prisma/client";
import { formatPrice } from "@/app/_modules/store/PurchaseLinkModule";
import {
  LinkIcon,
  LucideArrowRight,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { ExternalLinkTo } from "@/components/externallink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function ProductModuleS2C({
  product,
}: {
  product: Product & { licenses: License[] };
}) {
  const { push } = useRouter();

  const { mutate: modifyProduct, isLoading } = useMutation(["archiveProduct"], {
    mutationFn: async (input: any) => {
      return await axios.patch(`/api/store/products/${product.id}`, input);
    },
  });

  const manageArchiveState = () => {
    modifyProduct({ active: !product?.active });
  };

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <div className="flex flex-col">
            <span className="flex font-semibold text-2xl lg:text-3xl items-center align-middle gap-3">
              {product.name}
              <Badge>{product.active ? "Active" : "Archived"}</Badge>
            </span>
            <span className="text-muted-foreground ">
              sold for {formatPrice(product.price)}
            </span>
            <div
              className={`space-x-2 mt-3 align-middle items-center justify-center`}
            >
              <Button
                size={"sm"}
                disabled={!product.active}
                onClick={() => {
                  push(`/d/links/new?product=${product.id}`);
                }}
              >
                <LinkIcon size={16} className={`mr-2`} /> Create Link
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={`sm`} variant={"outline"}>
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      disabled={isLoading}
                      onClick={manageArchiveState}
                    >
                      <Trash size={16} className="mr-2 h-4 w-4" />
                      {product.active ? "Archive" : "Unarchive"} product
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
            </div>
          </div>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
        <Card>
          <CardHeader>
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
                {product.licenses.length > 0 ? (
                  <>
                    <ExternalLinkTo
                      href={`/d/customers/?product=${product.id}`}
                      className={`${
                        product.licenses.length < 1
                          ? "text-muted-foreground"
                          : null
                      }`}
                    >
                      {product.licenses.length} customer
                      {product.licenses.length > 1 ? "s" : null}
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
        <Card>
          <CardHeader>
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
        <Card>
          <CardHeader>
            <CardTitle>Waitlist</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent
            className={`flex items-center pt-5 text-muted-foreground`}
          >
            <h2 className="text-xl">Coming soon.</h2>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
