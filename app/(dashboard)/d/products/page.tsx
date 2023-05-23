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
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface Guild {
  id: string;
  name: string;
  permissions: string;
}

export default function DemoPage() {
  const REDIRECT_URI = `https://discord.com/api/oauth2/authorize?client_id=1107876953031180398&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fproducts&response_type=code&scope=bot`;
  const REDIRECT_URI2 =
    "https://discord.com/oauth2/authorize?permissions=8&guild_id=1108375792393662474&response_type=code&redirect_uri=https%3A%2F%2Fapi.hyper.co%2Fauth%2Flogin%2Fdiscord%2Fcallback&scope=bot&state=%7B%22redirect%22%3A%22%2Fproducts%2Fnew%3Frecipe%3Ddiscord%26integrations%5Bdiscord%5D%5Bguild%5D%3D1108375792393662474%22%7D&client_id=648234176805470248";

  const [selectedServer, setSelectedServer] = useState<string>(
    "1108746054205190224"
  );
  const [dialogActive, setDialogActive] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(0);

  const { data: session } = useSession();
  const {
    data: guildsData,
    isLoading: guildsDataLoading,
    isError,
  } = useQuery(["guilds"], {
    queryFn: async () => {
      return await fetch("/ajax/discord/guilds", {}).then(async (res) => {
        return (await res.json()) as Guild[];
      });
    },
    retry: 3,
    enabled: !!session,
  });

  // TODO(greek): god damn. please refactor.
  const { data: selectedServerData, isLoading: selectedServerLoading } =
    useQuery(["selectedServer"], {
      queryFn: async () => {
        return await fetch(
          `/ajax/discord/guilds/${selectedServer as string}`,
          {}
        ).then(async (res) => {
          if (res.status == 404) return null;
          return (await res.json()) as Guild;
        });
      },
      enabled: !!session && !!selectedServer && !!guildsData,
    });

  const {
    data: productCreationSubmission,
    isLoading: isProductCreationSubmitting,
  } = useMutation(["createProduct"], {
    mutationFn: async (data: any) => {

    }
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createProduct = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className={`border-b-[.1em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Products</span>
          <div className={"space-x-2 mt-2 lg:mt:0"}>
            <Dialog>
              <DialogTrigger>
                <Button onClick={() => setDialogActive(true)}>
                  Create New Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                {formStep == 0 && (
                  <>
                    <DialogHeader>
                      <DialogTitle>What will you sell?</DialogTitle>
                      <DialogDescription>
                        Select your server you&apos;d like to sell access, and
                        select a role to give.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      {dialogActive && (
                        <form>
                          <select
                            placeholder="Select a server.."
                            onChange={handleSubmit((data) => {
                              setSelectedServer("1108746054205190224");
                            })}
                          >
                            <option disabled selected>
                              Select a server..
                            </option>
                            {dialogActive &&
                              guildsData?.map((guild) => {
                                return (
                                  <option
                                    key={guild.id}
                                    value={guild.id}
                                    {...register("server", {
                                      required: "select one option",
                                    })}
                                  >
                                    {guild.name} ({guild.id})
                                  </option>
                                );
                              })}
                          </select>
                          {!selectedServerData ? (
                            <Button
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                router.push(`${REDIRECT_URI}`);
                              }}
                            >
                              Invite Bot
                            </Button>
                          ) : (
                            <Button
                              size={"sm"}
                              disabled={!selectedServer}
                              onClick={() => setFormStep(1)}
                            >
                              Next
                            </Button>
                          )}
                        </form>
                      )}
                    </DialogFooter>
                  </>
                )}
                {formStep == 1 && (
                  <>
                    <form className={`mt-2`}>
                      <DialogHeader>
                        <DialogTitle>What will you sell?</DialogTitle>
                        <DialogDescription>
                          Choose a name and write a description of what you are
                          selling.
                        </DialogDescription>
                        <label className="mb-5">Name</label>
                        <Input
                          placeholder="Product name"
                          {...register("productName")}
                          className="mb-4"
                        ></Input>
                        <label>Description</label>
                        <Input
                          placeholder="Your description"
                          {...register("productDescription")}
                          className="mb-4"
                        ></Input>
                        <label>Type</label>
                        <Input
                          placeholder="Product name"
                          defaultValue={"Recurring"}
                          disabled
                          {...register("productType")}
                          className="mb-4"
                        ></Input>
                        <label>Period</label>
                        <Input
                          placeholder="Product name"
                          defaultValue={"month"}
                          disabled
                          {...register("productPeriod")}
                          className="mb-4"
                        ></Input>

                        <label>Price</label>
                        <Input
                          placeholder="Product name"
                          {...register("productPrice")}
                          className="mb-4"
                        ></Input>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={handleSubmit(createProduct)}
                          className={`mt-2`}
                          size="sm"
                          type="submit"
                        >
                          Create Product
                        </Button>
                      </DialogFooter>
                    </form>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-3 px-10 mt-4">
        {isError && <p>Could not load guilds :(</p>}
      </div>
    </>
  );
}
