"use client";

import { LinkItem } from "@/app/(dashboard)/d/layout";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Store } from "@prisma/client";
import clsx from "clsx";
import { StoreIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Navbar {
  links: LinkItem;
  store: Store | undefined;
}

export const Sidebar: React.FC<Navbar> = ({ links, store }) => {
  let pathname = usePathname() || "/";

  return (
    <aside className="hidden md:flex top-1 md:flex-shrink-0 -mx-4 md:mx-0 md:px-0">
      <nav className="flex flex-row w-60 shrink-0 md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative border-r-[.05em]">
        <div className="shrink-0 w-full">
          <div className="relative z-30">
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-4 w-full text-left hover:bg-neutral-200 dark:hover:bg-neutral-100/10">
                <span
                  className={
                    "flex flex-row text-center items-center outline-none"
                  }
                >
                  <StoreIcon size={24} className="mr-3" />{" "}
                  <div className="flex-1 grow overflow-hidden">
                    <div className="text-black dark:text-white truncate text-sm font-medium text-left">
                      {store?.name ?? "n/a"}
                    </div>
                    <div className="-mt-0.5 text-black dark:text-white truncate text-xs !text-opacity-50 text-left">
                      {store?.domain ?? "n/a"}
                    </div>
                  </div>
                </span>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-row md:flex-col space-x-0 mb-2 mt-2 md:mt-0 w-full">
          {Object.entries(links).map(([link, { name, icon }]) => {
            const isActive = link == pathname;
            return (
              <Link
                key={link}
                href={link}
                className={clsx(
                  "whitespace-nowrap flex items-center py-1.5 pl-4 hover:bg-neutral-200 dark:hover:bg-neutral-100/10",
                  { "text-neutral-600 dark:text-neutral-400": !isActive }
                )}
              >
                {icon}
                <span
                  className={clsx(
                    "flex-1 text-sm font-medium ml-3 !text-opacity-60"
                  )}
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
