import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OnboardCheck from "./OnboardCheck";
import { stripe } from "@/lib/stripe";

const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const metadata = {
  title: "Overview",
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");

  const store = session.user?.stores.find((store) => {
    return store;
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
            <Button variant={"outline"}>Visit Portal</Button>
            <Button>Create Link</Button>
          </div>
        </div>
      </div>
      {/* } */}
      <div className="grid grid-cols-4 gap-x-6 gap-y-3 px-10 -mt-10">
        <>
          <Card>
            <CardHeader className={`pb-2`}>
              <CardDescription>Total customers</CardDescription>
            </CardHeader>
            <CardContent>
              {/* @ts-ignore */}
              <span className="text-3xl">{store?.licenses?.length == 0 ? "0 :(" : store?.licenses?.length}</span>
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
        </>
        <OnboardCheck store={store} />
        <p>{store?.stripeId}</p>
      </div>
    </>
  );
}
