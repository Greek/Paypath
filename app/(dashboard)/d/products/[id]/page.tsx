import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function ProductPage(context: { params: { id: string } }) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores.find((store) => {
    return store;
  });

  const productStripe = await stripe.products.retrieve(context.params.id, {
    stripeAccount: store?.stripeId,
  });
  const priceStripe = await stripe.prices.retrieve(
    `${productStripe.default_price}`,
    { stripeAccount: store?.stripeId }
  );

  if (!priceStripe) return notFound();

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl lg:text-3xl">
              {productStripe.name}
            </span>
            <span className="text-neutral-400 ">
              sold for {priceStripe.unit_amount_decimal}
            </span>
          </div>
          <div className={"space-x-2 mt-2 lg:mt:0"}>
            <Button variant={"outline"}>Visit Portal</Button>
            <Button>Create Link</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-3 px-10 -mt-10">
        <Card className={`w-3xl`}>
          <CardHeader className={`pb-5`}>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className={`py-3 min-w-7xl`}>
            <div className={`flex flex-row justify-between`}><p>Hi</p><p>Hello</p></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
