import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { getAbsoluteUrl } from "@/lib/utils";
import { CircleSlashIcon, HomeIcon } from "lucide-react";

export type LinkItem = {
  [key: string]: { name: string; icon: JSX.Element; breadcrumb: string };
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeInfo = await fetch(getAbsoluteUrl("/ajax/user")).then((res) => {
    return res.json();
  });

  console.log(storeInfo);

  const links: LinkItem = {
    "/overview": {
      name: "Home",
      icon: <HomeIcon size={16} />,
      breadcrumb: "Overview",
    },
    "/billing": {
      name: "Billing",
      icon: <CircleSlashIcon size={16} />,
      breadcrumb: "Billing",
    },
  };

  return (
    <div className={`flex flex-row`}>
      <Sidebar links={links} store={storeInfo.user.store} />
      <div className={`flex flex-col md:px-10 w-full `}>
        <Header links={links} store={storeInfo.user.store} />
        <div className="w-auto pt-4 px-4">
          {children}
          <TailwindIndicator />
        </div>
      </div>
    </div>
  );
}
