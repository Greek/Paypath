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
  ArrowLeftRight,
  LinkIcon,
  LucideArrowRight,
  LucideKey,
  LucideMail,
  MoreHorizontal,
  Pencil,
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
import Masthead, {
  MastheadButtonSet,
  MastheadHeading,
  MastheadHeadingWrapper,
} from "@/components/masthead-layout";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function CustomerModule(context: { params: { id: string } }) {
  const { push } = useRouter();
  const {
    data: license,
    refetch,
    isLoading,
  } = useQuery(["license"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/licenses/${context.params.id}`)).data
        .license as License & {
        product: Product;
        customer: User & { accounts: Account[] };
      };
    },
  });

  const isNotActive = !license?.active;

  const { isLoading: isDeletingLicense, mutate: deactivateLicense } =
    useMutation(["deactivateLicense"], {
      mutationFn: async () => {
        return (await axios.put(`/api/store/licenses/${license?.id}`)).data;
      },
    });

  const { toast } = useToast();

  const cancelUserSubscription = async () => {
    deactivateLicense();
    refetch();
  };

  return (
    <>
      <Masthead>
        <div className="flex flex-col">
          {license && (
            <>
              <MastheadHeadingWrapper>
                <div className="flex flex-row gap-3 align-middle items-center pb-1">
                  <Image
                    alt={`${license.customer.name}'s profile picture.`}
                    src={license.customer.image as string}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <MastheadHeading>@{license.customer.name}</MastheadHeading>
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
              </MastheadHeadingWrapper>
              <MastheadButtonSet>
                <Button size={"sm"} disabled={isNotActive}>
                  <Pencil size={16} className="mr-2" /> Edit
                </Button>
                <Button size={"sm"} disabled={isNotActive}>
                  <ArrowLeftRight size={16} className="mr-2" /> Transfer
                </Button>
                <Button
                  size={"sm"}
                  disabled={isNotActive}
                  onClick={cancelUserSubscription}
                >
                  <Trash size={16} className="mr-2" /> Cancel
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size={`sm`} variant={"outline"}>
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <LucideKey size={16} className="mr-2" /> Change license
                        key
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LucideMail size={16} className="mr-2 " />
                        Send email receipt
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          push(`/d/links/${license.linkId}`);
                        }}
                      >
                        <LucideArrowRight size={16} className="mr-2 " />
                        View link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(license.key);
                          toast({
                            title: "License key copied!",
                            value: "Your copy is ready for the pasta!",
                          });
                        }}
                      >
                        Copy license key
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
