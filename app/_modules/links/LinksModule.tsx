"use client";

import { ExternalLinkTo } from "@/components/externallink";
import LoadingIndicator from "@/components/loadingindicator";
import {
  SectionIntroduction,
  SectionIntroductionDescription,
  SectionIntroductionHeading,
  SectionIntroductionIcon,
} from "@/components/sectionintroduction";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Book, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Moment from "react-moment";

export default function LinksModule({
  searchParams,
}: {
  searchParams: { product: string };
}) {
  const router = useRouter();

  const { data: links, isLoading } = useQuery(["links"], {
    queryFn: async () => {
      return (await axios.get("/api/store/links")).data as Link[];
    },
  });

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Links</span>
          <div className={"space-x-2 mt-2 lg:mt:0"}>
            {links && links?.length > 0 && (
              <Button
                onClick={() => {
                  router.push("/d/links/new");
                }}
              >
                <Plus scale={16} className="mr-2" />
                Create Link
              </Button>
            )}
          </div>
        </div>
      </div>
      {isLoading && <LoadingIndicator />}
      {links && links.length > 0 && (
        <div className="grid gap-x-6 gap-y-3 px-10 mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Link</TableHead>
                <TableHead>Nickname</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            {links
              ?.filter((link) => {
                if (searchParams.product)
                  return link.productId == searchParams.product;
                else return link;
              })
              // @ts-ignore
              ?.map((link: Link & { product: Product }) => {
                return (
                  <>
                    <a href={`/d/links/${link.id}`} className="w-full contents">
                      <TableRow>
                        <TableCell className="font-medium w-[20rem]">
                          {link.id}
                        </TableCell>
                        <TableCell>
                          {link.nickname?.length! > 0
                            ? link.nickname
                            : link.product.name}
                        </TableCell>
                        <TableCell>{link.product.name}</TableCell>
                        <TableCell>
                          <Moment format="MMMM Do YYYY">
                            {link.createdAt}
                          </Moment>
                        </TableCell>
                      </TableRow>
                    </a>
                  </>
                );
              })}
          </Table>
        </div>
      )}
      {links?.length == 0 && !isLoading && (
        <SectionIntroduction>
          <SectionIntroductionIcon>
            <Book size={24} />
          </SectionIntroductionIcon>
          <SectionIntroductionHeading>
            Start collecting payments.
          </SectionIntroductionHeading>
          <SectionIntroductionDescription>
            Links are where your audience will purchase access to your products,
            a.k.a., your server.
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
