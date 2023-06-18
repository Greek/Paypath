"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Account, License, Link, Product, User } from "@prisma/client";
import { formatPrice } from "@/app/_modules/store/PurchaseLinkModule";
import {
  LinkIcon,
  LucideArrowRight,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { LinkTo } from "@/components/externallink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Moment from "react-moment";

export default function CustomerModule(context: { params: { id: string } }) {
  const { push } = useRouter();
  const {
    data: license,
    refetch,
    isLoading,
  } = useQuery(["product"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/licenses/${context.params.id}`)).data
        .license as License & {
        product: Product;
        customer: User & { accounts: Account[] };
        link: Link;
      };
    },
  });

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <div className="flex flex-col">
            {license && (
              <>
                <div className="flex flex-row gap-3 align-middle items-center">
                  <Image
                    alt={`${license.customer.name}'s profile picture.`}
                    src={license.customer.image as string}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <span className="flex font-semibold text-2xl lg:text-3xl items-center align-middle">
                      @{license.customer.name}
                    </span>
                    <span className="flex text-lg items-center align-middle">
                      on&nbsp;
                      <LinkTo href={`/d/products/${license.product.id}`}>
                        {license.product.name}
                      </LinkTo>
                      &nbsp;
                      <Badge>
                        {license.active ? (
                          "Active"
                        ) : (
                          <p>
                            Cancelled{" "}
                            <Moment format="MMMM Do">
                              {license.cancelledAt as unknown as string}
                            </Moment>
                          </p>
                        )}
                      </Badge>
                    </span>
                  </div>
                </div>
                <div
                  className={`space-x-2 mt-3 align-middle items-center justify-center`}
                >
                  <Button
                    size={"sm"}
                    disabled={!license.active}
                    onClick={() => {
                      push(`/d/links/new?product=${license.id}`);
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            push(`/d/links/${license.link?.id}`);
                          }}
                        >
                          <LucideArrowRight
                            size={16}
                            className="mr-2 h-4 w-4"
                          />
                          View link
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
        {license && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className={`py-3 space-y-2 text-left text-sm`}>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Username</p>
                  <p>@{license.customer.name}</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Email</p>
                  <p>{license.customer.email}</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>License key</p>
                  <p>{license.key}</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>ID</p>
                  <p>{license.id}</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Discord ID</p>
                  {
                    license.customer.accounts?.find((acc) => {
                      return acc.provider == "discord";
                    })?.providerAccountId
                  }
                </div>

                {/* <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Transfers</p>
                <p>{product.price}</p>
              </div> */}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
