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
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { OnboardingSteps } from "./components/OnboardCheck";
import { Link, Product, Store } from "@prisma/client";
import Masthead, {
  MastheadButtonSet,
  MastheadHeading,
  MastheadHeadingWrapper,
} from "@/components/masthead-layout";

export const metadata = {
  title: "Overview",
};

export default function OverviewModule({ params }: { params: { id: string } }) {
  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);

  const { data: store, isLoading } = useQuery(["store"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/${selectedStore?.id}`))
        .data as Store & { products: Product[]; Link: Link[] };
    },
    onSuccess(data) {
      return data;
    },
    enabled: !!selectedStore,
  });

  return (
    <>
      <Masthead>
        <MastheadHeadingWrapper>
          <MastheadHeading>
            {store?.displayName || <Skeleton className={`h-6 w-64`} />}
          </MastheadHeading>
        </MastheadHeadingWrapper>
        <MastheadButtonSet>
          {store ? (
            <ButtonSet storeName={store.name} />
          ) : (
            <Skeleton className={`h-6 w-40`} />
          )}
        </MastheadButtonSet>
      </Masthead>
      {isLoading && (
        <>
          <>
            <div className="grid grid-cols-4 gap-x-6 gap-y-3 px-10 -mt-10">
              <>
                <Card>
                  <CardHeader className={`pb-2`}>
                    <CardDescription>
                      <Skeleton className={`h-6 w-64`} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className={`h-9 w-24`} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className={`pb-2`}>
                    <CardDescription>
                      <Skeleton className={`h-6 w-64`} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className={`h-9 w-12`} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className={`pb-2`}>
                    <CardDescription>
                      <Skeleton className={`h-6 w-64`} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className={`h-9 w-36`} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className={`pb-2`}>
                    <CardDescription>
                      <Skeleton className={`h-6 w-64`} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className={`h-9 w-24`} />
                  </CardContent>
                </Card>
              </>
            </div>
          </>
        </>
      )}
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
        !isLoading && store && <OnboardingSteps store={store} />
      )}
    </>
  );
}
