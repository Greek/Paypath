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
      <div className={`border-b-[.1em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-10 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Settings</span>
        </div>
      </div>
      <div className="flex  flex-row space-x-2">
        <div className={`space-y-2 p-8 w-[450px]`}>
          <Button variant={"ghost"}>
            <span className={`text-left`}>General</span>
          </Button>
        </div>
        <div className="flex flex-col w-full space-y-4 pr-12 py-4">{children}</div>
      </div>
    </>
  );
}
