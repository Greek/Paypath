"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StoreModel } from "@/app/_schemas";
import { useForm } from "react-hook-form";
import { Store } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

const SettingsCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter
    className={`flex justify-between border-t-[.1em] text-sm text-muted-foreground`}
    ref={ref}
  >
    {props.children}
  </CardFooter>
));

SettingsCardFooter.displayName = "SettingsCardFooter";

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StoreModel),
  });

  const {
    isLoading: isLoadingSession,
    error,
    data: storeData,
  } = useQuery(["user"], () => fetch("/api/session").then((res) => res.json()));

  const { mutate, isLoading } = useMutation(["title"], {
    mutationFn: async (data: Store) =>
      await fetch("/ajax/store", {
        method: "PATCH",
        body: JSON.stringify({ ...data }),
      }).then(async (r) => {
        await r.json();
      }),
  });

  const { mutate: mutateDescription, isLoading: isLoadingDescription } =
    useMutation(["description"], {
      mutationFn: async (data: Store) =>
        await fetch("/ajax/store", {
          method: "PATCH",
          body: JSON.stringify(data),
        }).then(async (r) => {
          await r.json();
        }),
    });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  const onSubmitDescription = async (data: any) => {
    console.log(data)
    mutateDescription(data);
  };

  return (
    !isLoadingSession && (
      <div className={`space-y-2`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className={`pb-2`}>
              <CardTitle>Store name</CardTitle>
              <CardDescription>
                This is the name that is used for your store. It will show in
                the member portal and the dashboard. a
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                className={"w-[50%]"}
                defaultValue={storeData?.name}
                {...register("name")}
              ></Input>

              <div className="mt-2">
                <span className={`text-sm text-muted-foreground`}>
                  {errors?.name?.message as string}
                </span>
              </div>
            </CardContent>
            <SettingsCardFooter>
              <p>
                Make sure your store&apos;s name is at <b>most</b> 32
                characters.
              </p>
              <Button size="sm" type="submit" disabled={isLoading}>
                Save
              </Button>
            </SettingsCardFooter>
          </Card>
        </form>
        <form onSubmit={handleSubmit(onSubmitDescription)}>
          <Card>
            <CardHeader className={`pb-2`}>
              <CardTitle>Store description</CardTitle>
              <CardDescription>
                This will show on your email reciepts and in the portal. Make it
                a memorable one! 😉
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                className={"w-[50%]"}
                defaultValue={storeData?.description}
                {...register("description")}
              ></Input>
              <div className="mt-2">
                <span className={`text-sm text-muted-foreground`}>
                  {errors?.description?.message as string}
                </span>
              </div>
            </CardContent>
            <SettingsCardFooter>
              <p>Hi</p>
              <Button size="sm" disabled={isLoadingDescription}>
                Save
              </Button>
            </SettingsCardFooter>
          </Card>
        </form>
        <Card>
          <CardHeader className={`pb-2`}>
            <CardTitle>Domain</CardTitle>
            <CardDescription>
              This will be the URL to the domain your users will go to for
              purchasing plans, and managing memberships. As of now, there is no
              support for custom domains but make sure to{" "}
              <a
                href={"https://discord.gg/3MPGTCPAEe"}
                className={`text-blue-300`}
              >
                stay tuned!
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              className={"w-[50%]"}
              defaultValue={storeData?.name + "gatekeep.pro"}
              disabled
            ></Input>
          </CardContent>
          <SettingsCardFooter>
            <p>Ensure your domain is active.</p>
            <Button size="sm" disabled>
              Change Domain
            </Button>
          </SettingsCardFooter>
        </Card>
      </div>
    )
  );
}
