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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product } from "@prisma/client";
import { APIRole } from "discord-api-types/v10";

export interface Guild {
  id: string;
  name: string;
  permissions: string;
  roles: APIRole[];
}

export default function ProductsPage() {
  const REDIRECT_URI = `https://discord.com/api/oauth2/authorize?client_id=1107876953031180398&permissions=8&redirect_uri=${
    process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  }%2Fd%2Fproducts&response_type=code&scope=bot`;
  const REDIRECT_URI2 =
    "https://discord.com/oauth2/authorize?permissions=8&guild_id=1108375792393662474&response_type=code&redirect_uri=https%3A%2F%2Fapi.hyper.co%2Fauth%2Flogin%2Fdiscord%2Fcallback&scope=bot&state=%7B%22redirect%22%3A%22%2Fproducts%2Fnew%3Frecipe%3Ddiscord%26integrations%5Bdiscord%5D%5Bguild%5D%3D1108375792393662474%22%7D&client_id=648234176805470248";

  const [selectedServer, setSelectedServer] = useState<string>();

  const [selectedRole, setSelectedRole] = useState<string>();
  const [paypathRolePos, setPaypathRolePos] = useState<number>(8);

  const [dialogActive, setDialogActive] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(0);
  const [redirectId, setRedirectId] = useState<number>();

  const { data: session } = useSession();
  const { data: guildsData, isError } = useQuery(["guilds"], {
    queryFn: async () => {
      return await fetch("/ajax/discord/guilds", {}).then(async (res) => {
        return (await res.json()) as Guild[];
      });
    },
    retry: 3,
    enabled: !!session,
  });

  // TODO(greek): god damn. please refactor.
  const {
    data: selectedServerData,
    isLoading: selectedServerLoading,
    refetch,
  } = useQuery(["selectedServer"], {
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
    data: selectedServerRoles,
    isLoading: selectedServerRolesLoading,
    refetch: refetchServerRoles,
  } = useQuery(["selectedServer"], {
    queryFn: async () => {
      return await fetch(
        `/ajax/discord/guilds/${selectedServer as string}/roles`,
        {}
      ).then(async (res) => {
        if (res.status == 404) return null;
        return (await res.json()) as APIRole[];
      });
    },
    enabled: !!selectedServerData,
  });

  const {
    isLoading: isProductCreationSubmitting,
    mutate: createProductMutation,
    isSuccess: mutationIsSuccess,
  } = useMutation(["createProduct"], {
    mutationFn: async (data: any) => {
      return await fetch("/api/store/products", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => {
        return res.json();
      });
    },

    onSuccess(data) {
      setRedirectId(data.id);
    },
  });

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryFn: async () => {
      return await fetch("/api/store/products").then(async (res) => {
        return (await res.json()) as Product[];
      });
    },
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createProduct = (data: any) => {
    createProductMutation({
      name: data.name,
      description: data.description,
      type: data.type,
      price: data.price,
      server: selectedServer,
    });

    setRedirectId(redirectId);

    redirect(`/d/products/${redirectId}`);
  };

  // Fetch server data when server is selected.
  useEffect(() => {
    refetch();
  }, [selectedServer, refetch]);

  useEffect(() => {
    refetchServerRoles();
  }, [selectedServerRoles, refetchServerRoles]);

  const productTypeItems = [
    { name: "Recurring" },
    { name: "Lifetime" },
    { name: "Free" },
  ];

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
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
                    {dialogActive && (
                      <form className="w-full">
                        <p className={`text-sm mb-2`}>Server</p>
                        <Select
                          onValueChange={(e) => {
                            setSelectedServer(e);
                          }}
                        >
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Select a Server" />
                          </SelectTrigger>
                          <SelectContent>
                            {dialogActive &&
                              guildsData?.map((guild) => {
                                return (
                                  <SelectItem
                                    key={guild.id}
                                    value={guild.id}
                                    {...register("server", {
                                      required: "select one option",
                                    })}
                                  >
                                    {guild.name} ({guild.id})
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>

                        {selectedServerRoles && (
                          <Select
                            onValueChange={(e) => {
                              setSelectedRole(e);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Optional role" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedServerRoles.length >= 1 &&
                                paypathRolePos &&
                                selectedServerRoles
                                  ?.filter((role) => {
                                    return role.name != "@everyone";
                                  })
                                  ?.filter((role) => {
                                    return role.position < paypathRolePos!;
                                  })
                                  .map((role) => {
                                    return (
                                      <SelectItem
                                        key={role.id}
                                        value={role.id}
                                        {...register("role")}
                                      >
                                        {role.name}
                                      </SelectItem>
                                    );
                                  })}
                            </SelectContent>
                          </Select>
                        )}

                        <DialogFooter className={`mt-2`}>
                          {!selectedServerData ? (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                router.push(`${REDIRECT_URI}`);
                              }}
                              size={"sm"}
                              disabled={selectedServerLoading}
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
                        </DialogFooter>
                      </form>
                    )}
                  </>
                )}
                {formStep == 1 && (
                  <>
                    <form>
                      <DialogHeader>
                        <DialogTitle>What will you sell?</DialogTitle>
                        <DialogDescription>
                          Choose a name and write a description of what you are
                          selling.
                        </DialogDescription>
                        <Separator />
                        <label>Name</label>
                        <Input
                          placeholder="Product name"
                          {...register("name")}
                          className="mb-4"
                        ></Input>
                        <TinyErrorMessage>
                          {errors.name?.message as string}
                        </TinyErrorMessage>
                        <label>Description</label>
                        <Input
                          placeholder="Your description"
                          {...register("description")}
                          className="mb-4"
                        ></Input>
                        <label>Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Product type" />
                          </SelectTrigger>
                          <SelectContent>
                            {productTypeItems.map((item) => {
                              return (
                                <SelectItem
                                  key={item.name}
                                  value={item.name}
                                  {...register("type")}
                                >
                                  {item.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <TinyErrorMessage>
                          {errors.type?.message as string}
                        </TinyErrorMessage>

                        <label>Price</label>
                        <div className="flex flex-row space-x-2">
                          <Input
                            placeholder="Product name"
                            {...register("price")}
                            className="mb-4"
                          ></Input>
                          <TinyErrorMessage>
                            {errors.price?.message as string}
                          </TinyErrorMessage>
                          <Input
                            placeholder="Recurring period"
                            disabled
                            {...register("interval")}
                            className="mb-4"
                          ></Input>
                          <TinyErrorMessage>
                            {errors.interval?.message as string}
                          </TinyErrorMessage>
                        </div>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={handleSubmit(createProduct)}
                          className={`mt-2`}
                          size="sm"
                          type="submit"
                          disabled={!!isProductCreationSubmitting}
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
        {isProductsLoading && <p>Give us a sec...</p>}
        {products ? <DataTable columns={columns} data={products} /> : <p>uh</p>}
      </div>
    </>
  );
}

export function TinyErrorMessage({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  return children ? (
    <p className={`text-red-700 text-sm`}>
      {children}
    </p>
  ) : null;
}
