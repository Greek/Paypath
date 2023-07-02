"use client";

import Header from "@/components/ui/header";
import Sidebar from "@/components/sidebar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import {
  CircleSlashIcon,
  HomeIcon,
  PackageIcon,
  ShareIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ToasterLoader from "@/app/ToasterLoader";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai/react";
import { selectedStoreAtom } from "@/lib/atoms";

export type LinkItem = {
  [key: string]: {
    name: string;
    icon?: JSX.Element;
    breadcrumb: string;
    hidden?: boolean;
  };
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [store, setStore] = useAtom(selectedStoreAtom);

  const { data: stores } = useQuery(["stores"], {
    queryFn: async () => {
      return (await axios.get(`/api/me/stores`)).data.stores;
    },
  });

  useEffect(() => {
    if (session === null) return push("/i/login");
    if (stores?.length < 1) push("/onboarding");
  }, [session, push, stores]);

  const links: LinkItem = {
    "/d/overview": {
      name: "Home",
      icon: <HomeIcon size={16} />,
      breadcrumb: "Overview",
    },
    "/d/products": {
      name: "Products",
      breadcrumb: "Products",
      icon: <PackageIcon size={16} />,
    },
    "/d/links": {
      name: "Links",
      breadcrumb: "Links",
      icon: <ShareIcon size={16} />,
    },
    "/d/customers": {
      name: "Customers",
      breadcrumb: "Customers",
      icon: <UserIcon size={16} />,
    },
    "/d/billing": {
      name: "Billing",
      icon: <CircleSlashIcon size={16} />,
      breadcrumb: "Billing",
    },
    "/d/settings": {
      name: "Settings",
      hidden: true,
      breadcrumb: "Settings",
    },
  };

  return (
    stores && (
      <div className={`flex flex-row`}>
        <Sidebar links={links} store={store} />
        <div className={`flex flex-col w-full`}>
          <Header links={links} store={store} />
          <div className="w-auto pt-4 h-screen">
            {children}
            <ToasterLoader />
            <TailwindIndicator />
          </div>
        </div>
      </div>
    )
  );
}
