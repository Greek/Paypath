"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { HomeIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ links }: any) {
  let pathname = usePathname() || "/";

  return (
    <aside className="hidden md:block md:w-[250px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0">
      <nav
        className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative bg-neutral-100 dark:bg-neutral-100/10 h-screen"
        id="nav"
      >
        <div className="shrink-0 w-full">
          <div className="relative z-30">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-4 w-full text-left hover:bg-neutral-200 dark:hover:bg-neutral-100/10">
                <span
                  className={
                    "flex flex-row text-center items-center mx-1 text-neutral-400 outline-none"
                  }
                >
                  <StoreIcon size={16} className="mr-2" />{" "}
                  <div className="flex-1 grow overflow-hidden">
                    <div className="text-black dark:text-white truncate text-sm font-medium text-left">
                      Store name
                    </div>
                    <div className="-mt-0.5 text-black dark:text-white truncate text-xs !text-opacity-50 text-left">
                      Store domain
                    </div>
                  </div>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className={`w-full hover:bg-neutral-100/10`}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-row md:flex-col space-x-0 mb-2 mt-2 md:mt-0 w-full">
          {Object.entries(links).map(([link, { name }]) => {
            const isActive = link == pathname;
            return (
              <Link
                key={link}
                href={link}
                className={clsx(
                  "focus:outline-none whitespace-nowrap flex items-center py-1.5 pl-4 hover:bg-neutral-200 dark:hover:bg-neutral-100/10",
                  { "text-neutral-600 dark:text-neutral-400": !isActive }
                )}
              >
                <HomeIcon size={15} />
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
}
