"use client";

import clsx from "clsx";
import {
  HelpCircleIcon,
  HomeIcon,
  SettingsIcon,
  StoreIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { LinkItem } from "@/app/(dashboard)/layout";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Store } from "@prisma/client";

interface Header {
  links: LinkItem;
  store: Store | undefined;
}

export const Header: React.FC<Header> = ({ links, store }) => {
  let pathname = usePathname() || "/";
  // const { data: session } = useSession();
  // const params = useSearchParams();

  // const [store, setStore] = useState<Store | null>(null);

  // useEffect(() => {
  //   setStore(
  //     // @ts-ignore
  //     session?.user?.stores.find((store) => {
  //       store.id == params.get("s");
  //     }) ??
  //       session?.user?.stores[0]
  //   );
  // }, [session]);

  return (
    <header className="w-full space-y-2 md:space-y-0 border-b md:border-none">
      <div className="w-100 md:hidden bg-neutral-100 dark:bg-neutral-100/10">
        <div className="relative z-30">
          <DropdownMenu>
            <DropdownMenuTrigger type="button">
              <div className="flex items-center space-x-3 px-4 py-2">
                <StoreIcon scale={16} />
                <div className="flex-1 grow overflow-hidden">
                  <div className="text-black dark:text-white truncate text-sm font-medium text-left">
                    {store?.name}
                  </div>
                  <div className="-mt-0.5 text-black dark:text-white truncate text-xs !text-opacity-50 text-left">
                    {store?.domain}
                  </div>
                </div>
                <div className="flex-none flex flex-col -space-y-1.5 text-black dark:text-white !text-opacity-50"></div>
              </div>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-12 px-10 flex items-center justify-between py-2">
        <div className="flex items-center space-x-1">
          <Link
            className="rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/overview"
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

                .find(([link, { name }]) => {
                  return pathname == link;
                })
                ?.map((link) => {
                  // @ts-ignore
                  return link.breadcrumb;
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
              <SettingsIcon width={20} />
            </div>
          </a>
          <div className="relative z-20">
            <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white !text-opacity-70">
              <HelpCircleIcon width={20} />
            </button>
          </div>
          <div className="relative z-20">
            <ProfileDropdown />
          </div>
        </div>
      </div>
      <MobileNav links={links} store={undefined} />
    </header>
  );
};

export const MobileNav: React.FC<Header> = ({ links }) => {
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
              "text-sm pb-3 px-1 focus:outline-none whitespace-nowrap text-black dark:text-white text-opacity-80 dark:text-opacity-80",
              {
                "border-black dark:border-white border-b-2": isActive,
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
};
export const ProfileDropdown: React.FC<any> = ({}) => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white !text-opacity-70">
        <UserIcon width={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          You {session ? `(${session.user?.name})` : "are not signed in.."}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!session ? (
          <DropdownMenuItem onClick={() => signIn("github")}>
            Sign in
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
