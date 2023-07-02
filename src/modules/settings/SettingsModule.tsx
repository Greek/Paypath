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
import { useSession } from "next-auth/react";
import { useAtom } from "jotai/react";
import { selectedStoreAtom } from "@/lib/atoms";
import axios from "axios";
import { Icons } from "@/components/icons";
import { wait } from "@/lib/wait";

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

  const { data: session } = useSession();

  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);

  const {
    isLoading: isLoadingSession,
    error,
    data: storeData,
    refetch,
  } = useQuery(
    ["user"],
    () => fetch(`/api/store/${selectedStore?.id}`).then((res) => res.json()),
    {
      enabled: !!session,
    }
  );

  const { mutate, isLoading } = useMutation(["title"], {
    mutationFn: async (input: any) => {
      await wait(250);
      return (await axios.patch(`/ajax/store/${selectedStore?.id}`, input))
        .data as Store;
    },
    onSuccess(data: Store, variables, context) {
      setSelectedStore(data);
      return data;
    },
  });

  const { mutate: mutateDescription, isLoading: isLoadingDescription } =
    useMutation(["description"], {
      mutationFn: async (input: any) => {
        await wait(250);
        return (await axios.patch(`/ajax/store/${selectedStore?.id}`, input))
          .data as Store;
      },
      onSuccess(data: Store, variables, context) {
        setSelectedStore(data);
        return data;
      },
    });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  const onSubmitDescription = async (data: any) => {
    mutateDescription(data);
  };

  return (
    <>
      {isLoadingSession && (
        <Card>
          <CardHeader className={`pb-2`}>
            <CardTitle className={`pb-2`}>We do a little loading..</CardTitle>
            <CardDescription className={`pb-2`}>😉</CardDescription>
          </CardHeader>
          <CardContent className={`pb-2`}>
            <Input className={"w-[50%]"}></Input>

            <div className="mt-2">
              <span className={`text-sm text-muted-foreground`}>
                {errors?.name?.message as string}
              </span>
            </div>
          </CardContent>
          <SettingsCardFooter>
            <p>
              Make sure your store&apos;s name is at <b>most</b> 32 characters.
            </p>
            <Button size={"sm"} disabled>
              This button does nothing.
            </Button>
          </SettingsCardFooter>
        </Card>
      )}

      {!isLoadingSession && (
        <div className={`space-y-2`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardTitle className={`pb-2`}>Store name</CardTitle>
                <CardDescription className={`pb-2`}>
                  This is the name that is used for your store. It will show in
                  the member portal and the dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className={`pb-2`}>
                <Input
                  className={"w-[50%]"}
                  defaultValue={storeData?.displayName}
                  {...register("displayName")}
                ></Input>

                <div className="mt-2">
                  <span className={`text-sm text-muted-foreground`}>
                    {errors?.displayName?.message as string}
                  </span>
                </div>
              </CardContent>
              <SettingsCardFooter>
                <p>
                  Make sure your store&apos;s name is at <b>most</b> 32
                  characters.
                </p>
                <Button size="sm" type="submit" disabled={!!isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Save
                </Button>
              </SettingsCardFooter>
            </Card>
          </form>
          <form onSubmit={handleSubmit(onSubmitDescription)}>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardTitle className={`pb-2`}>Store description</CardTitle>
                <CardDescription className={`pb-2`}>
                  This will show on your email reciepts and in the portal. Make
                  it a memorable one! 😉
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
                <p>Make sure your description is at most 64 characters long!</p>
                <Button
                  size="sm"
                  type="submit"
                  disabled={!!isLoadingDescription}
                >
                  {isLoadingDescription && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Save
                </Button>
              </SettingsCardFooter>
            </Card>
          </form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className={`pb-2`}>
                <CardTitle>Store slug</CardTitle>
                <CardDescription>
                  This will be the URL to the domain your users will go to for
                  purchasing plans, and managing memberships. As of now, there
                  is no support for custom domains but make sure to{" "}
                  <a
                    href={"https://discord.gg/3MPGTCPAEe"}
                    className={`text-blue-400`}
                  >
                    stay tuned!
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  className={"w-[50%]"}
                  defaultValue={storeData?.name}
                  {...register("name")}
                  onInput={(e) => {
                    e.preventDefault();
                    e.currentTarget.value.replaceAll(" ", "-");
                  }}
                ></Input>
              </CardContent>
              <SettingsCardFooter>
                <span></span>
                <Button size="sm" type="submit" disabled={isLoading}>
                  Save
                </Button>
              </SettingsCardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  );
}
