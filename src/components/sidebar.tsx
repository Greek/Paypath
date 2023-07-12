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
  store: Store | null;
}

export const Sidebar: React.FC<Navbar> = ({ links, store }) => {
  let pathname = usePathname() || "/";

  return (
    <aside className="top-1 -mx-4 hidden md:mx-0 md:flex md:flex-shrink-0 md:px-0">
      <nav className="fade relative flex w-60 shrink-0 scroll-pr-6 flex-row items-start border-r-[.05em] px-0 pb-0 md:relative md:flex-col md:overflow-auto">
        <div className="w-full shrink-0">
          <div className="relative z-30">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full px-4 py-4 text-left hover:bg-neutral-200 dark:hover:bg-neutral-100/10">
                <span
                  className={
                    "flex flex-row items-center text-center outline-none"
                  }
                >
                  <StoreIcon size={24} className="mr-3" />{" "}
                  <div className="flex-1 grow overflow-hidden">
                    <div className="truncate text-left text-sm font-medium text-black dark:text-white">
                      {store?.displayName ?? "n/a"}
                    </div>
                    <div className="-mt-0.5 truncate text-left text-xs text-black !text-opacity-50 dark:text-white">
                      {store?.name ?? "n/a"}
                    </div>
                  </div>
                </span>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
        <div className="mb-2 mt-2 flex w-full flex-row space-x-0 px-4 md:mt-0 md:flex-col">
          {Object.entries(links).map(([link, { name, icon }]) => {
            const isActive = link == pathname;
            return (
              <Link
                key={link}
                href={link}
                className={clsx(
                  "my-2 flex flex-row items-center justify-center rounded-full border border-neutral-300/40 px-5 py-2 align-middle shadow-sm hover:bg-slate-100 dark:hover:bg-neutral-900",
                  { "text-neutral-600 dark:text-neutral-400": !isActive },
                  { "bg-slate-100 dark:bg-neutral-800": isActive }
                )}
              >
                <span className="">{icon}</span>

                <span
                  className={clsx(
                    "flex-1 text-sm font-medium !text-opacity-60"
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
