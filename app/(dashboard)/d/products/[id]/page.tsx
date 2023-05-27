import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ProductDropdown from "./ProductDropdown";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export default async function ProductPage(context: { params: { id: string } }) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores.find((store) => {
    return store;
  });

  const product = await prisma.product.findUnique({
    where: { id: context.params.id },
  });

  if (!product) return notFound();

  const productStripe = await stripe.products.retrieve(context.params.id, {
    stripeAccount: store?.stripeId,
  });

  console.log(productStripe);

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl lg:text-3xl items-center">
              {product.name}
              <Badge>{product.archived ? "Active" : "Archived"}</Badge>
            </span>
            <span className="text-muted-foreground ">sold for ? USD</span>
            <div className={`space-x-2 mt-3`}>
              <Button size={"sm"} disabled={!product.archived}>
                Create Link
              </Button>
              {/* @ts-ignore */}
              <ProductDropdown
                productId={context.params.id}
                priceId={productStripe.default_price}
                archived={product.archived}
              />
            </div>
          </div>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-10 -mt-10">
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
            <div className={`grid grid-cols-2`}>
              <p className={`text-muted-foreground`}>ID</p>
              <a
                href={`https://dashboard.stripe.com${
                  !productStripe.livemode ? "/test" : ""
                }/products/${product.id}`}
                className={`underline`}
              >
                {product.id}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
