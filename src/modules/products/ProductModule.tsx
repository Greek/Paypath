"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { License, Product } from "@prisma/client";
import { formatPrice } from "@/modules/store/PurchaseLinkModule";
import {
  LinkIcon,
  LucideArrowRight,
  MoreHorizontal,
  PlusIcon,
  Trash,
} from "lucide-react";
import { ExternalLinkTo } from "@/components/externallink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect, useRouter } from "next/navigation";
import { useKeyPress } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Masthead, {
  MastheadButtonSet,
  MastheadHeading,
  MastheadHeadingWrapper,
} from "@/components/masthead-layout";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai/react";
import { selectedStoreAtom } from "@/lib/atoms";

export default function ProductModule(context: { params: { id: string } }) {
  const { push } = useRouter();
  const { data: session } = useSession();

  const [store, setStore] = useAtom(selectedStoreAtom);

  const {
    data: product,
    isLoading: isProductLoading,
    refetch,
  } = useQuery(["product"], {
    queryFn: async () => {
      return (
        await axios.get(
          `/api/store/${store?.name}/products/${context.params.id}`
        )
      ).data.product as Product & { licenses: License[] };
    },
    enabled: !!session,
  });

  const { mutate: modifyProduct, isLoading } = useMutation(["archiveProduct"], {
    mutationFn: async (input: any) => {
      return await axios.patch(
        `/api/store/${store?.name}/products/${context.params.id}`,
        input
      );
    },
    onSuccess() {
      refetch();
    },
  });

  const manageArchiveState = () => {
    modifyProduct({ active: !product?.active });
  };

  useKeyPress(["c"], () => {
    push(`/d/links/new?product=${product?.id}`);
  });

  return (
    <>
      <Masthead>
        <div className="flex flex-col">
          {isProductLoading && (
            <>
              <span>
                <Skeleton className="w-[23rem] h-[20px]" />
              </span>
              <span className="pt-3">
                <Skeleton className="w-[18rem] h-[20px]" />
              </span>
            </>
          )}
          {product && (
            <>
              <MastheadHeadingWrapper>
                <MastheadHeading
                  className={`flex items-center align-middle gap-3`}
                >
                  {product.name}
                  <Badge>{product.active ? "Active" : "Archived"}</Badge>
                </MastheadHeading>
                <span className="text-muted-foreground">
                  sold for {formatPrice(product.price)} {product.currency}
                </span>
              </MastheadHeadingWrapper>
              <MastheadButtonSet>
                <Button
                  size={"sm"}
                  disabled={!product.active || isLoading}
                  onClick={() => {
                    push(`/d/links/new?product=${product.id}`);
                  }}
                >
                  <PlusIcon size={16} className={`mr-2`} /> Create Link
                  <DropdownMenuShortcut variant={"default"}>
                    C
                  </DropdownMenuShortcut>
                </Button>
                <Button
                  onClick={() => {
                    push(`/d/links/?product=${product.id}`);
                  }}
                  size="sm"
                  variant={"outline"}
                >
                  <LinkIcon size={16} className="mr-2 h-4 w-4" />
                  See links
                  <DropdownMenuShortcut variant={"secondary"}>
                    L
                  </DropdownMenuShortcut>
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
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </MastheadButtonSet>
            </>
          )}
        </div>
      </Masthead>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
        {isProductLoading && (
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[15rem] h-[20px]" />
              </CardTitle>
              <Separator />
              <CardContent className={`py-3 space-y-2 text-left text-sm`}>
                <div className={`grid grid-cols-3`}>
                  <Skeleton className="float-left w-[4rem] h-[20px]" />
                  <Skeleton className="w-[4rem] h-[20px]" />
                </div>
                <div className={`grid grid-cols-3`}>
                  <Skeleton className="w-[4rem] h-[20px]" />
                  <Skeleton className="w-[4rem] h-[20px]" />
                </div>
                <div className={`grid grid-cols-3`}>
                  <Skeleton className="w-[4rem] h-[20px]" />
                  <Skeleton className="w-[4rem] h-[20px]" />
                </div>
                <div className={`grid grid-cols-3`}>
                  <Skeleton className="w-[4rem] h-[20px]" />
                  <Skeleton className="w-[4rem] h-[20px]" />
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        )}
        {product && (
          <>
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
                  <p>
                    {formatPrice(product.price)} {product.currency}
                  </p>
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
                <CardTitle>Waitlist</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent
                className={`flex items-center pt-5 text-muted-foreground`}
              >
                <h2 className="text-xl">Coming soon.</h2>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
