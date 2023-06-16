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
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export type LinkItem = {
  [key: string]: {
    name: string;
    icon?: JSX.Element;
    breadcrumb: string;
    hidden?: boolean;
  };
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  if (!session?.user) return redirect("/");
  if (session?.user?.stores.length! < 1) redirect("/onboarding");

  const store = session?.user.stores.find((store) => {
    return store;
  });

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
    <div className={`flex flex-row`}>
      <Sidebar links={links} store={store} />
      <div className={`flex flex-col w-full`}>
        <Header links={links} store={store} />
        <div className="w-auto pt-4 h-screen">
          {children}
          <TailwindIndicator />
        </div>
      </div>
    </div>
  );
}
