"use client";

import { ExternalLinkTo } from "@/components/externallink";
import LoadingIndicator from "@/components/loadingindicator";
import Masthead, {
  MastheadButtonSet,
  MastheadHeading,
  MastheadHeadingWrapper,
} from "@/components/masthead-layout";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Moment from "react-moment";

export default function LinksModule({
  searchParams,
}: {
  searchParams: { product: string };
}) {
  const router = useRouter();

  const { data: session } = useSession();
  const { data: links, isLoading } = useQuery(["links"], {
    queryFn: async () => {
      return (await axios.get("/api/store/links")).data as Link[];
    },
  });

  return (
    <>
      <Masthead>
        <MastheadHeadingWrapper>
          <MastheadHeading>Links</MastheadHeading>
        </MastheadHeadingWrapper>
        <MastheadButtonSet>
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
        </MastheadButtonSet>
      </Masthead>
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
            disabled={
              !session?.user?.stores[0].stripeId ||
              // @ts-ignore
              !session.user.stores[0].products
            }
          >
            <Plus scale={16} className="mr-2" />
            Create Link
          </Button>
        </SectionIntroduction>
      )}
    </>
  );
}
