"use client";

import { formatPrice } from "@/modules/store/PurchaseLinkModule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Link, Product, Store, User } from "@prisma/client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  ArrowUpRightFromCircleIcon,
  ArrowRight,
  LinkIcon,
  MoreHorizontalIcon,
  PinIcon,
  TrashIcon,
  PlusSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Moment from "react-moment";
import { useState } from "react";
import { useKeyPress } from "@/lib/utils";
import { wait } from "@/lib/wait";
import Masthead, {
  MastheadButtonSet,
  MastheadHeading,
  MastheadHeadingWrapper,
} from "@/components/masthead-layout";
import { WEBAPP_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai/react";
import { selectedStoreAtom } from "@/lib/atoms";

export default function LinkModule({ params }: { params: { id: string } }) {
  const { push } = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [store, setStore] = useAtom(selectedStoreAtom);

  const {
    data: link,
    isLoading: isLinkLoading,
    refetch: refetchProduct,
  } = useQuery(["link"], {
    queryFn: async () => {
      return await fetch(`/api/store/${store?.id}/links/${params.id}`).then(
        async (res) => {
          return (await res.json()) as Link & {
            product: Product;
            user: User;
            store: Store;
          };
        }
      );
    },
  });

  const { mutate: modifyLink, isLoading: isModifying } = useMutation(
    ["archiveLink"],
    {
      mutationFn: async (data: any) => {
        return (
          await axios.post(`/api/store/${store?.id}/links/${link?.id}`, data)
        ).data.link as Link;
      },
      onSuccess() {
        refetchProduct();
      },
      onError(err) {
        if (err instanceof AxiosError)
          toast({
            title: "Woah there...",
            description: err.response?.data.message,
          });
      },
    }
  );

  const manageLinkPin = () => {
    modifyLink({ pinned: !link?.pinned });
  };

  const copyLinkLink = async () => {
    navigator.clipboard.writeText(combinedURI);
    setCopiedState(true);
    await wait(2500);
    setCopiedState(false);
  };

  useKeyPress(["p"], manageLinkPin);
  useKeyPress(["s"], copyLinkLink);
  const [copied, setCopiedState] = useState(false);

  const combinedURI = `${WEBAPP_URL}/${link?.store.name}/${link?.id}`;

  return (
    <>
      <Masthead>
        <div className="flex flex-col">
          <MastheadHeadingWrapper>
            <MastheadHeading className="items-center align-middle gap-3">
              {link && !isLinkLoading ? (
                <>
                  {link?.nickname?.length! > 0
                    ? link?.nickname
                    : link.product.name}{" "}
                  <Badge>{link?.active ? "Active" : "Archived"}</Badge>
                </>
              ) : null}
            </MastheadHeading>
            <span className="text-muted-foreground ">
              {!link ? null : (
                <>
                  sold for {formatPrice(link?.product?.price)}{" "}
                  {link.product.currency}
                </>
              )}
            </span>
          </MastheadHeadingWrapper>

          {link && (
            <>
              <div className="w-[32rem]">
                <Input defaultValue={combinedURI} readOnly />
              </div>
              <MastheadButtonSet className={`pt-2`}>
                <Button
                  size={"sm"}
                  disabled={!link.active}
                  onClick={copyLinkLink}
                >
                  <LinkIcon size={16} className={`mr-2`} />
                  {!copied ? "Copy link" : "Copied!"}
                  <DropdownMenuShortcut>S</DropdownMenuShortcut>
                </Button>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  disabled={!link.active || isModifying}
                  onClick={manageLinkPin}
                >
                  <PinIcon size={16} className={`mr-2`} />
                  {!link.pinned ? "Pin link" : "Remove pin"}
                  <DropdownMenuShortcut variant={"secondary"}>
                    P
                  </DropdownMenuShortcut>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size={"sm"} variant={"outline"}>
                      <MoreHorizontalIcon size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        modifyLink({ active: !link.active, pinned: false });
                      }}
                    >
                      {link.active ? (
                        <>
                          <TrashIcon size={16} className="mr-2" />
                          Archive
                        </>
                      ) : (
                        <>
                          <PlusSquare size={16} className="mr-2" />
                          Activate
                        </>
                      )}{" "}
                      link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        push(`/d/products/${link.productId}`);
                      }}
                    >
                      <ArrowRight size={16} className="mr-2" /> View product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        push(`/d/customers/?product=${link.productId}`);
                      }}
                    >
                      <ArrowRight size={16} className="mr-2" /> View licenses
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(link.id);
                      }}
                    >
                      <ArrowUpRightFromCircleIcon size={16} className="mr-2" />{" "}
                      Copy ID
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </MastheadButtonSet>
            </>
          )}
        </div>
      </Masthead>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
        {!isLinkLoading && link ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className={`py-3 space-y-2 text-left text-sm`}>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Nickname</p>
                  {link?.nickname?.length != 0 ? (
                    <p>{link?.nickname}</p>
                  ) : (
                    <p className={`text-muted-foreground`}>No nickname</p>
                  )}
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Stock</p>
                  {link?.stock == -1 ? (
                    <p className={`text-muted-foreground`}>Unlimited stock</p>
                  ) : (
                    link?.stock
                  )}
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Created on</p>
                  <p>
                    <Moment format={"MMMM Do YYYY"}>{link?.createdAt}</Moment>
                  </p>
                </div>{" "}
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Created by</p>
                  <p>{link?.user?.name}</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Expires on</p>
                  <p className={`text-muted-foreground`}>Coming soon.</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Password</p>
                  <p className={`text-muted-foreground`}>Coming soon.</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Initial fee</p>
                  <p className={`text-muted-foreground`}>Coming soon.</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Free trial</p>
                  <p className={`text-muted-foreground`}>Coming soon.</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Restrictions</p>
                  <p className={`text-muted-foreground`}>None applied.</p>
                </div>
                <div className={`grid grid-cols-3`}>
                  <p className={`text-muted-foreground`}>Requires product</p>
                  <p className={`text-muted-foreground`}>Coming soon.</p>
                </div>
                {/* <div className={`grid grid-cols-2`}>
              <p className={`text-muted-foreground`}>ID</p>
              <a
                href={`https://dashboard.stripe.com${
                  !productStripe.livemode ? "/test" : ""
                }/products/${product.id}`}
                className={`underline`}
              >
                {product.id}
              </a>
            </div> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Link preview</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className={`p-0 text-left text-sm h-full`}>
                <iframe
                  src={combinedURI}
                  title="preview"
                  className="-mt-[3rem] -ml-20"
                  style={{
                    transform: "scale(0.7)",
                    width: "calc(120.8%)",
                    height: "calc(110%)",
                    visibility: "visible",
                    userSelect: "none",
                  }}
                ></iframe>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </>
  );
}
