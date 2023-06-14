"use client";

import { formatPrice } from "@/app/modules/store/LinkPurchasePage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Product, User } from "@prisma/client";
import { Separator } from "@radix-ui/react-select";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function LinkPage({ params }: { params: { id: string } }) {
  const { data: link, isLoading: isLinkLoading } = useQuery({
    queryFn: async () => {
      return await fetch(`/api/store/links/${params.id}`).then(async (res) => {
        return (await res.json()) as Link & { product: Product; user: User };
      });
    },
  });

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl lg:text-3xl items-center">
              {isLinkLoading ? (
                "Loading..."
              ) : (
                <>
                  {link?.nickname?.length != 0
                    ? link?.nickname
                    : link.product.name}
                </>
              )}
            </span>
            <span className="text-muted-foreground ">
              {isLinkLoading ? null : (
                <>sold for ${formatPrice(link?.product?.price as string)} USD</>
              )}
            </span>
            <span>${link?.productId}</span>
            <div className={`space-x-2 mt-3`}></div>
          </div>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
        {!isLinkLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            {/* <Separator /> */}
            <CardContent className={`py-3 space-y-2 text-left`}>
              <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Nickname</p>
                {link?.nickname?.length != 0 ? (
                  <p>{link?.nickname}</p>
                ) : (
                  <p className={`text-muted-foreground`}>No nickname</p>
                )}
              </div>
              <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Stock</p>
                {link?.stock == -1 ? (
                  <p className={`text-muted-foreground`}>Unlimited stock</p>
                ) : (
                  link?.stock
                )}
              </div>
              <div className={`grid grid-cols-2`}>
                <p className={`text-muted-foreground`}>Created by</p>
                <p>{link?.user?.name}</p>
              </div>{" "}
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
        )}
      </div>
    </>
  );
}
