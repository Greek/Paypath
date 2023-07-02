"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import ButtonSet from "./components/ButtonSet";
import { AfterOnboardSteps } from "./components/AfterOnboardSteps";
import { useAtom } from "jotai/react";
import { selectedStoreAtom } from "@/lib/atoms";
import { useQuery } from "@tanstack/react-query";
import { OnboardingSteps } from "./components/OnboardCheck";
import axios from "axios";

export const metadata = {
  title: "Overview",
};

export default function OverviewModule({ params }: { params: { id: string } }) {
  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);

  const { data: store } = useQuery(["store"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/${selectedStore?.id}`)).data;
    },
  });

  return (
    <>
      <div className={`border-b-[.1em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">
            {store?.displayName}
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
                  <span className="text-3xl">Not implemented</span>
                </CardContent>
              </Card>
            </>
          </div>
          <div className="py-6 px-10">
            {/* @ts-ignore */}
            <AfterOnboardSteps store={store} />
          </div>
        </>
      ) : (
        // @ts-ignore
        <OnboardingSteps store={store} />
      )}
    </>
  );
}
