import Header from "@/components/header";
import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = {
    "/d": { name: "Home" },
    "/d/billing": { name: "Billing" },
  };

  return (
    <div className={`flex flex-row`}>
      <Navbar links={links} />
      <div className={`flex flex-col md:px-10 w-full `}>
        <Header links={links} />
        <div className="w-auto pt-4 px-4">{children}</div>
      </div>
    </div>
  );
}
