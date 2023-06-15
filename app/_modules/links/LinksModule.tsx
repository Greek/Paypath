"use client";

import { ExternalLinkTo } from "@/components/externallink";
import { Button } from "@/components/ui/button";
import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Book, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LinksModule({
  searchParams,
}: {
  searchParams: { product: string };
}) {
  const router = useRouter();

  const { data: links } = useQuery(["links"], {
    queryFn: async () => {
      return (await axios.get("/api/store/links")).data as Link[];
    },
  });

  useEffect(() => {
    console.log(searchParams.product);
    console.log(
      links?.filter((link) => {
        return link.productId == searchParams.product ?? null;
      })
    );
  }, [searchParams.product, links]);

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Links</span>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-3 px-52 mx-64 pt-20 mt-4">
        <div className="flex flex-col justify-center max-w-sm px-3">
          {links
            ?.filter((link) => {
              if (searchParams.product)
                return link.productId == searchParams.product;
              else return link;
            })
            ?.map((link) => {
              return (
                <ExternalLinkTo href={`/d/links/${link.id}`} key={link.id}>
                  {link.nickname ?? <p>{link.productId}</p>}
                </ExternalLinkTo>
              );
            })}
          <div
            className={`flex justify-center items-center rounded-md bg-gray-100 dark:bg-slate-900 text-gray-400 border w-12 h-12 mb-2`}
          >
            <Book size={24} />
          </div>
          <div className="prose">
            <h3 className="text-xl dark:text-slate-200 font-semibold mb-0">
              Start collecting payments.
            </h3>
            <p className="text-sm dark:text-slate-300">
              Links are where your audience will purchase access to your
              products, a.k.a., your server.
            </p>
            <Button
              onClick={() => {
                router.push("/d/links/new");
              }}
            >
              <Plus scale={16} className="mr-2" />
              Create Link
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
