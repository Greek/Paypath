"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { HomeIcon, SettingsIcon, StoreIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export default function Header({ links }: any) {
  const pathname = usePathname();

  return (
    <header className="w-full space-y-2 md:space-y-0 border-b md:border-none">
      <div className="w-100 md:hidden bg-neutral-200 dark:bg-gray-800">
        <div className="relative z-30">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-5 py-2 w-full" type="button">
              <div className="flex items-center space-x-3">
                <StoreIcon scale={16} />
                <div className="flex-1 grow overflow-hidden">
                  <div className="text-black dark:text-white truncate text-sm font-medium text-left">
                    Store name
                  </div>
                  <div className="-mt-0.5 text-black dark:text-white truncate text-xs !text-opacity-50 text-left">
                    Store domain
                  </div>
                </div>
                <div className="flex-none flex flex-col -space-y-1.5 text-black dark:text-white !text-opacity-50"></div>
              </div>
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
      <div className="h-12 px-4 flex items-center justify-between py-2">
        <div className="flex items-center space-x-1">
          <Link
            className="rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/d/"
          >
            <div className="overflow-hidden max-w-xs text-black dark:text-white truncate text-sm font-medium !text-opacity-70">
              <HomeIcon size={16} />
            </div>
          </Link>
          <span className="select-none text-black dark:text-white !text-opacity-30">
            /
          </span>
          <Link
            className="rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/d/"
          >
            <div className="overflow-hidden max-w-xs text-black dark:text-white truncate text-sm font-medium !text-opacity-70">
              {Object.entries(links)
                .find(([l, { n }]) => {
                  return pathname == l;
                })
                ?.map((a: any) => {
                  return a.name;
                })}
            </div>
          </Link>
        </div>
        <div className="relative flex items-center text-sm space-x-1">
          <a
            className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/settings"
          >
            <div className="text-black dark:text-white !text-opacity-70">
              <SettingsIcon width={16} height={16} />
            </div>
          </a>
          <div className="relative z-20">
            <button
              className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white !text-opacity-70"
              id="headlessui-menu-button-:r2:"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="circle-question"
                className="svg-inline--fa fa-circle-question fa-fw fa-lg "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="relative z-20">
            <button className="rounded p-1 text-black dark:text-white !text-opacity-70">
              <UserIcon width={16} />
            </button>
          </div>
        </div>
      </div>
      <MobileNav links={links} />
    </header>
  );
}

export function MobileNav({ links }: any) {
  let pathname = usePathname() || "/";

  return (
    <nav className="flex md:hidden -mb-px px-5 md:px-10 overflow-x-auto space-x-3 text-gray-500 dark:text-gray-400 scrollbar-none">
      {Object.entries(links).map(([link, { name }]) => {
        const isActive = link == pathname;
        return (
          <Link
            key={link}
            href={link}
            className={clsx(
              "text-sm pb-3 px-1 focus:outline-none whitespace-nowrap text-black dark:text-white text-opacity-80 dark:text-opacity-80 border-b-2",
              {
                "border-black dark:border-white": isActive,
                "border-b-0": !isActive,
              }
            )}
          >
            <span
              className={clsx("flex-1 text-sm font-medium", {
                "text-neutral-500 dark:text-neutral-500": !isActive,
              })}
            >
              {name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
