import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import OnboardCheck, {
  LinkToLinksPage,
  LinkToProductsPage,
} from "./components/OnboardCheck";
import { stripe } from "@/lib/stripe";
import ButtonSet from "./components/ButtonSet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";
import { Store } from "@prisma/client";
import { auth } from "@/app/auth";

export const metadata = {
  title: "Overview",
};

export default async function OverviewModule({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) return redirect("/");

  const store = await prisma.store.findFirst({
    where: {
      id: session.user?.stores.find((store) => {
        return store;
      })?.id,
    },
    include: {
      products: true,
      Link: true,
    },
  });

  let storeStripe;
  let balanceStripe;
  if (store?.stripeId) {
    storeStripe = await stripe.accounts.retrieve(store?.stripeId as string);

    balanceStripe = await stripe.balance.retrieve({
      stripeAccount: store?.stripeId as string,
    });
  }

  return (
    <>
      <div className={`border-b-[.1em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">
            {store?.name}
          </span>
          <div className={"space-x-2 mt-2 lg:mt:0"}>
            <ButtonSet />
          </div>
        </div>
      </div>
      {store?.stripeId?.length! > 0 &&
      store?.products?.length! > 0 &&
      store?.Link?.length! > 0 ? (
        <div className="grid grid-cols-4 gap-x-6 gap-y-3 px-10 -mt-10">
          <>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardDescription>Total customers</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl">
                  {/* @ts-ignore */}
                  {store?.licenses?.length == 0
                    ? "0 :("
                    : /* @ts-ignore */
                      store?.licenses?.length}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardDescription>Upcoming cancellations</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl">Not implemented</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardDescription>Monthly revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl">Not implemented</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardDescription>Available balance</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl">
                  {balanceStripe?.available[0].amount ?? "Unknown."}
                </span>
              </CardContent>
            </Card>
            <p>{store?.stripeId}</p>
          </>
        </div>
      ) : (
        <div className="-mt-10 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Ready to get started?</CardTitle>
              <CardDescription>
                You&apos;re a couple of steps away from accepting payments.
                Let&apos;s get going!
              </CardDescription>
            </CardHeader>
            <CardContent className={`p-0 mt-2 border-t`}>
              <Accordion type="single" className="w-full">
                <AccordionItem value="connect-stripe">
                  <AccordionTrigger className={`px-6`}>
                    Connect Stripe
                  </AccordionTrigger>
                  <AccordionContent className={`px-6`}>
                    To begin using Paypath, you must connect a Stripe account so
                    that we can process payments to your account.
                    <br />
                    <br />
                    <OnboardCheck store={store as Store} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="create-product">
                  <AccordionTrigger className={`px-6`}>
                    Create a product
                  </AccordionTrigger>
                  <AccordionContent className={`px-6`}>
                    Products represent access to your Discord server and what
                    they provide. You can make one so that people are able to
                    access your server as well as any optional roles you&apos;d
                    like to make available. You can customize which roles to
                    give out, and more to come soon!
                    <br />
                    <br />
                    <LinkToProductsPage />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="create-link">
                  <AccordionTrigger className={`px-6`}>
                    Create a link
                  </AccordionTrigger>
                  <AccordionContent className={`px-6`}>
                    Links are the front pages where people will purchase your
                    product and get access. Go ahead and create one and share it
                    to the world.
                    <br />
                    <br />
                    <LinkToLinksPage />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Okay, what now?</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
