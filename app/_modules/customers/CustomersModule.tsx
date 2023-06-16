"use client";

import { ExternalLinkTo } from "@/components/externallink";
import {
  SectionIntroduction,
  SectionIntroductionDescription,
  SectionIntroductionHeading,
  SectionIntroductionIcon,
} from "@/components/sectionintroduction";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { License, Product, Store, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PersonStanding, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Moment from "react-moment";

export default function CustomersModule({
  searchParams,
}: {
  searchParams: { product: string };
}) {
  const router = useRouter();
  const session = useSession();

  const { data: store } = useQuery(["links"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/${session.data?.user?.stores[0].id}`))
        .data as Store & { licenses: License[] };
    },
    enabled: !!session.data?.user,
  });

  return (
    <>
      <div className={`border-b-[.05em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Customers</span>
          <div className={"space-x-2 mt-2 lg:mt:0"}></div>
        </div>
      </div>
      {store && store.licenses.length > 0 ? (
        <div className="grid gap-x-6 gap-y-3 px-10 pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Purchased</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {store.licenses
                .filter((license) => {
                  if (searchParams.product)
                    return license.productId == searchParams.product;
                  return license;
                })
                .map(
                  /* @ts-ignore */
                  (license: License & { customer: User; product: Product }) => {
                    return (
                      <>
                        <a
                          href={`/d/customers/${license.id}`}
                          className="w-full contents"
                        >
                          <TableRow>
                            <TableCell className="font-medium w-[20rem]">
                              @{license.customer.name}
                            </TableCell>
                            <TableCell>{license.product.name}</TableCell>
                            <TableCell>
                              <kbd>{license.key}</kbd>
                            </TableCell>
                            <TableCell>
                              <Moment format="MMMM Do YYYY">
                                {license.purchasedAt}
                              </Moment>
                            </TableCell>
                          </TableRow>
                        </a>
                      </>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <SectionIntroduction>
          <SectionIntroductionIcon>
            <PersonStanding size={24} />
          </SectionIntroductionIcon>
          <SectionIntroductionDescription>
            <SectionIntroductionHeading>
              An insight into your sales
            </SectionIntroductionHeading>
            <p className="text-sm dark:text-slate-300">
              When somebody purchases one of your products, their information
              will show up here.
            </p>
          </SectionIntroductionDescription>
          <Button
            onClick={() => {
              router.push("/d/links/new");
            }}
          >
            <Plus scale={16} className="mr-2" />
            Create a new Link
          </Button>
        </SectionIntroduction>
      )}
    </>
  );
}
