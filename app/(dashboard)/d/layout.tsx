import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export type LinkItem = {
  [key: string]: { name: string; breadcrumb: string };
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links: LinkItem = {
    "/d": { name: "Home", breadcrumb: "Overview" },
    "/d/billing": { name: "Billing", breadcrumb: "Billing" },
  };

  return (
    <div className={`flex flex-row`}>
      <Sidebar links={links} />
      <div className={`flex flex-col md:px-10 w-full `}>
        <Header links={links} />
        <div className="w-auto pt-4 px-4">
          {children}
          <TailwindIndicator />
        </div>
      </div>
    </div>
  );
}
