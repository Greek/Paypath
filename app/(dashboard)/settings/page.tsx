"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StoreModel } from "@/app/_schemas";
import { useSession } from "next-auth/react";

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

export default async function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(StoreModel) });

  const { data: session } = useSession();
  const store = session?.user?.stores.find((store) => {
    return store;
  });

  return (
    <>
      <Card>
        <CardHeader className={`pb-2`}>
          <CardTitle>Store name</CardTitle>
          <CardDescription>
            This is the name that is used for your store. It will show in the
            member portal and the dashboard. {store?.id} a
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <Input
              className={"w-[50%]"}
              defaultValue={store?.name}
              {...register("name")}
            ></Input>
          </CardContent>
          <SettingsCardFooter>
            <p>Hi</p>
            <Button size="sm">Save</Button>
            {errors.name?.message && <p>{errors.name?.message}</p>}
          </SettingsCardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader className={`pb-2`}>
          <CardTitle>Store description</CardTitle>
          <CardDescription>
            This will show on your email reciepts and in the portal. Make it a
            memorable one! 😉
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input className={"w-[50%]"} defaultValue={store?.name}></Input>
        </CardContent>
        <SettingsCardFooter>
          <p>Hi</p>
          <Button size="sm">Save</Button>
        </SettingsCardFooter>
      </Card>
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
          <Input className={"w-[50%]"} defaultValue={store?.name}></Input>
        </CardContent>
        <SettingsCardFooter>
          <p>Ensure your domain is active.</p>
          <Button size="sm" disabled>
            Change Domain
          </Button>
        </SettingsCardFooter>
      </Card>
    </>
  );
}
