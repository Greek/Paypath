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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai/react";
import { selectedStoreAtom } from "@/lib/atoms";

export interface OnboardingInput {
  name: string;
  avgRevenue?: string;
}

export default function Onboarding() {
  const { register, handleSubmit } = useForm<OnboardingInput>();
  const { push } = useRouter();

  const [store, setStore] = useAtom(selectedStoreAtom);

  const { mutate } = useMutation(["createStore"], {
    mutationFn: async (d: OnboardingInput) => {
      return (await axios.post("/ajax/store/onboarding", d)).data;
    },
    onSuccess(data, variables, context) {
      console.log(data);
      setStore(data);
      console.log("the store", store);
      push("/d/overview");
    },
  });

  const handleOnboarding: SubmitHandler<OnboardingInput> = async (formData) => {
    mutate(formData);
  };

  return (
    <div className="relative box-border flex min-h-screen flex-col px-10 py-10">
      {/* <span className="font-semibold text-3xl">Hey there.</span> */}
      <div className="flex h-full flex-1 items-center justify-center">
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
