import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Settings",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <div className={`border-foreground-muted w-full border-b-[.1em]`}>
        <div className="flex flex-col px-10 pb-20 pt-24 lg:flex-row lg:justify-between">
          <span className="text-4xl font-semibold lg:text-5xl">Settings</span>
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className={`flex w-[450px] space-y-2 p-8`}>
          <Button variant={"ghost"} className="w-full content-start">
            <span className={`text-left`}>General</span>
          </Button>
        </div>
        <div className="flex h-screen w-full flex-col space-y-4 py-4 pr-12">
          {children}
        </div>
      </div>
    </>
  );
}
