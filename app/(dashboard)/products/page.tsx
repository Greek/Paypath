"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function DemoPage() {
  const { data: session } = useSession();
  const { data: guilds, isLoading, isError } = useQuery([], {
    queryFn: async () => {
      return await fetch("/ajax/discord/guilds", {}).then(async (res) => {
        return await res.json() as Guild;
      });
    },
    enabled: !!session,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className={`border-b-[.1em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Products</span>
          <div className={"space-x-2 mt-2 lg:mt:0"}>
            <Dialog>
              <DialogTrigger>
                <Button>Create New Product</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>What will you sell?</DialogTitle>
                  <DialogDescription>
                    Select your server you&apos;d like to sell access, and
                    select a role to give.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <select
                    placeholder="Select a server.."
                      {...register("server", {
                        required: "select one option",
                      })}
                    >
                      <option  disabled>Select a server..</option>
                      {!isLoading && (
                        <>
                          {guilds?.map((guild) => {
                            return (
                              <option key={guild.id} value={guild.id}>
                                {guild.name}
                              </option>
                            );
                          })}
                        </>
                      )}
                    </select>

                    <Button type="submit">Confirm</Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-3 px-10 mt-4">
        {!isLoading && !isError && guilds && (
          <>
            {guilds?.map((d) => {
              return d.name + "\n";
            })}
          </>
        )}
      </div>
    </>
  );
}
