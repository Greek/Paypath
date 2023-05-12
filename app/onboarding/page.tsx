"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"

export interface OnboardingInput {
  name: string;
  avgRevenue?: string;
}

export default function Onboarding() {
  const { register, handleSubmit } = useForm<OnboardingInput>();
  const { push } = useRouter();

  const handleOnboarding: SubmitHandler<OnboardingInput> = async (formData) => {
    const data = await fetch("/ajax/store-onboarding", {
      method: "POST",
      body: JSON.stringify(formData),
    }).then(async (res) => {
      push("/overview");
    });
  };

  return (
    <div className="flex flex-col px-10 py-10 min-h-screen box-border relative">
      {/* <span className="font-semibold text-3xl">Hey there.</span> */}
      <div className="flex justify-center items-center h-full flex-1">
        <form onSubmit={handleSubmit(handleOnboarding)}>
          <Card>
            <CardHeader>
              <CardTitle>Let&apos;s get started.</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Your store's name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              ></Input>
              <Button type="submit">Let&apos;s go!</Button>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
