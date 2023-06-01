import { DoorOpen, Search, StoreIcon } from "lucide-react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div
      className={`min-h-screen relative overflow-x-hidden flex flex-col justify-center`}
    >
      <div className="relative mx-auto max-w-3xl sm:rounded-lg overflow-hidden sm:border shadow-xl">
        {children}
      </div>
    </div>
  );
}
