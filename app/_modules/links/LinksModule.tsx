"use client";

import { ExternalLinkTo } from "@/components/externallink";
import {
  SectionIntroduction,
  SectionIntroductionDescription,
  SectionIntroductionHeading,
  SectionIntroductionIcon,
} from "@/components/sectionintroduction";
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
      {links ? (
        <div className="grid gap-x-6 gap-y-3 px-10 mt-4">
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
        </div>
      ) : (
        <SectionIntroduction>
          <SectionIntroductionIcon>
            <Book size={24} />
          </SectionIntroductionIcon>
          <SectionIntroductionDescription>
            <SectionIntroductionHeading>
              Start collecting payments.
            </SectionIntroductionHeading>
            <p className="text-sm dark:text-slate-300">
              Links are where your audience will purchase access to your
              products, a.k.a., your server.
            </p>
          </SectionIntroductionDescription>
          <Button
            onClick={() => {
              router.push("/d/links/new");
            }}
          >
            <Plus scale={16} className="mr-2" />
            Create Link
          </Button>
        </SectionIntroduction>
      )}
    </>
  );
}
