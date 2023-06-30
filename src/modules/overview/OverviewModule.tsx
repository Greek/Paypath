import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import ButtonSet from "./components/ButtonSet";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";
import { OnboardingSteps } from "./components/OnboardCheck";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AfterOnboardSteps } from "./components/AfterOnboardSteps";

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
      id: session.user?.stores[0]?.id,
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

  if (session.user?.stores.length! < 1) return redirect("/onboarding");

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
        <>
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
                    {balanceStripe?.available![0].amount ?? "N/A"}
                  </span>
                </CardContent>
              </Card>
            </>
          </div>
          <div className="py-6 px-10">
            {/* @ts-ignore */}
            <AfterOnboardSteps storeInfo={store} />
          </div>
        </>
      ) : (
        // @ts-ignore
        <OnboardingSteps store={store} />
      )}
    </>
  );
}
