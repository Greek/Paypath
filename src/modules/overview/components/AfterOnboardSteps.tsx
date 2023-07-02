"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AfterOnboardSteps = (store: Store) => {
  const { push } = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-flow-row grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <Card
              onClick={() => {
                //@ts-ignore
                push(`/${store.store?.name}`);
              }}
              className="cursor-pointer"
            >
              <CardHeader className="flex flex-row cursor-pointer align-middle gap-x-2 px-6 pt-6 pb-2 space-y-0">
                <CardTitle className="cursor-pointer">
                  Visit your store&apos;s dashboard
                </CardTitle>
                <ArrowRight className="pb-1" />
              </CardHeader>
              <CardContent className="text-sm cursor-pointer">
                Check out your store&apos;s dashboard and see how it looks like.
              </CardContent>
            </Card>
            <Card
              onClick={() => {
                push("/d/links/new");
              }}
              className="cursor-pointer"
            >
              <CardHeader className="flex flex-row cursor-pointer align-middle gap-x-2 px-6 pt-6 pb-2 space-y-0">
                <CardTitle className="cursor-pointer">
                  Create a new Link
                </CardTitle>
                <ArrowRight className="pb-1" />
              </CardHeader>
              <CardContent className="text-sm cursor-pointer">
                Create a link to your product(s) to push it out to the world and
                make some sales.
              </CardContent>
            </Card>
            <Card
              onClick={() => {
                push("/d/links");
              }}
              className="cursor-pointer"
            >
              <CardHeader className="flex flex-row cursor-pointer align-middle gap-x-2 px-6 pt-6 pb-2 space-y-0">
                <CardTitle className="cursor-pointer">
                  Pin your existing links
                </CardTitle>
                <ArrowRight className="pb-1" />
              </CardHeader>
              <CardContent className="text-sm cursor-pointer">
                Manage and pin your links so they are visible on your store
                page.
              </CardContent>
            </Card>
            <Card
              onClick={() => {
                push("/d/links/new");
              }}
              className="cursor-pointer"
            >
              <CardHeader className="flex flex-row cursor-pointer align-middle gap-x-2 px-6 pt-6 pb-2 space-y-0">
                <CardTitle className="cursor-pointer">
                  Change your branding
                </CardTitle>
                <ArrowRight className="pb-1" />
              </CardHeader>
              <CardContent className="text-sm cursor-pointer">
                Manage the way your store appears on its panel. From the
                store&apos;s icon, to the name and description, to the
                background.
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
