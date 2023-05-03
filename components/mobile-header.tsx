"use client";

import clsx from "clsx";
import { HomeIcon, Link } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileHeader() {
  const links = {
    "/d": { name: "Home" },
    "/d/billing": { name: "Billing" },
  };
  let pathname = usePathname() || "/";

  return (
    <header className="w-full space-y-2 md:space-y-0 border-b md:border-none">
      <div className="w-100 md:hidden bg-gray-800">
        <div className="relative z-30">
          <button
            className="px-5 py-2 w-full hover:bg-gray-800"
            id="headlessui-menu-button-:r1:"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            data-headlessui-state=""
          >
            <div className="flex items-center space-x-3">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="store"
                className="svg-inline--fa fa-store fa-fw text-white opacity-60 text-sm"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M491.1 129.5l0 0c5.8 9.2 6.4 20.5 2.3 30.1c-3.9 9.2-11.1 14.8-20.1 16c-2 .3-3.9 .4-5.8 .4c-11.7 0-22.2-5.1-29.7-13.2c-9.1-10-22-15.7-35.6-15.7s-26.5 5.8-35.5 15.8c-7.3 8.1-17.7 13.2-29.6 13.2c-11.8 0-22.3-5.1-29.6-13.2c-9.1-10.1-22-15.8-35.6-15.8s-26.5 5.7-35.6 15.8c-7.3 8.1-17.7 13.2-29.6 13.2c-11.8 0-22.3-5.1-29.6-13.2c-9.1-10.1-22-15.8-35.6-15.8s-26.5 5.7-35.6 15.8C98.6 170.9 88.2 176 76.4 176c-1.8 0-3.8-.1-5.8-.4c-8.9-1.2-16-6.8-19.9-16c-4.1-9.6-3.5-20.9 2.3-30.1l0 0 0 0L104.4 48H439.6l51.5 81.5zM467.5 224c4.1 0 8.1-.3 12-.8c55.5-7.4 81.8-72.5 52.1-119.4L474.3 13.1C469.2 5 460.1 0 450.4 0H93.6C83.9 0 74.8 5 69.7 13.1L12.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c0 0 0 0 0 0c19.6 0 37.5-6.4 51.9-17c4.8-3.5 9.2-7.6 13.2-11.9c4 4.4 8.4 8.4 13.2 11.9c14.5 10.6 32.4 17 52 17c19.6 0 37.5-6.4 52-17c4.8-3.5 9.2-7.6 13.2-12c4 4.4 8.4 8.4 13.2 11.9c14.5 10.6 32.4 17 52 17c19.8 0 37.8-6.5 52.3-17.3c4.7-3.5 9-7.4 12.9-11.7c3.9 4.3 8.3 8.3 13 11.8c14.5 10.7 32.5 17.2 52.2 17.2c0 0 0 0 0 0zM96 336V254.4c-6.4 1.1-12.9 1.6-19.6 1.6c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V336v48 64c0 35.3 28.7 64 64 64H432c35.3 0 64-28.7 64-64V384 336 252.6c-4 1-8 1.8-12.3 2.3l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-6.6 0-13.1-.5-19.4-1.6V336H96zm352 48v64c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V384H448z"
                ></path>
              </svg>
              <div className="flex-1 grow overflow-hidden">
                <div className="!text-white text-black dark:text-white truncate text-sm font-medium text-left">
                  andreascord private
                </div>
                <div className="-mt-0.5 !text-white text-black dark:text-white truncate text-xs !text-opacity-50 text-left">
                  andreascord-private.hyper.co
                </div>
              </div>
              <div className="flex-none flex flex-col -space-y-1.5 !text-white text-black dark:text-white !text-opacity-50">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="angle-up"
                  className="svg-inline--fa fa-angle-up fa-sm "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M167 143c9.4-9.4 24.6-9.4 33.9 0L361 303c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-143-143L41 337c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L167 143z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="angle-down"
                  className="svg-inline--fa fa-angle-down fa-sm "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M201 337c-9.4 9.4-24.6 9.4-33.9 0L7 177c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l143 143L327 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L201 337z"
                  ></path>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="h-12 flex items-center justify-between py-2">
        <div className="flex items-center space-x-1">
          <a
            className="rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            target="_self"
            href="/dashboard"
          >
            <div className="overflow-hidden max-w-xs text-black dark:text-white truncate text-sm font-medium !text-opacity-70">
              <HomeIcon size={16} />
            </div>
          </a>
          <span className="select-none text-black dark:text-white !text-opacity-30">
            /
          </span>
          <a
            className="rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            target="_self"
            href="/dashboard"
          >
            <div className="overflow-hidden max-w-xs text-black dark:text-white truncate text-sm font-medium !text-opacity-70">
              Overview
            </div>
          </a>
        </div>
        <div className="relative flex items-center text-sm space-x-1">
          <a
            className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            target="_self"
            href="/settings"
          >
            <div className="text-black dark:text-white !text-opacity-70">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="gear"
                className="svg-inline--fa fa-gear fa-fw fa-lg "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M208.1 51.4C220.3 49.2 233 48 246 48s25.7 1.2 37.9 3.4l8.5 35.1c4.1 17 15.6 29.8 28.9 37.4l1.4 .8c13.2 7.7 30.1 11.3 46.9 6.4l34.6-10.2c7.4 8.7 14.2 18 20.1 27.8l4 6.9c5.4 9.8 10.1 20.2 13.9 30.9l-26.2 24.9c-12.7 12-18 28.4-17.9 43.7l0 .8 0 .8c-.1 15.3 5.3 31.6 17.9 43.7l26.2 24.9c-3.8 10.7-8.5 21.1-13.9 30.9l-4 6.9c-5.9 9.8-12.7 19.1-20.1 27.8l-34.6-10.2c-16.8-5-33.7-1.4-46.9 6.4l-1.4 .8c-13.2 7.6-24.8 20.4-28.9 37.4l-8.5 35.1c-12.3 2.3-25 3.4-37.9 3.4s-25.7-1.2-37.9-3.4l-8.5-35.1c-4.1-17-15.6-29.8-28.9-37.4l-1.4-.8c-13.2-7.7-30.1-11.3-46.9-6.4L87.9 391.1c-7.4-8.7-14.2-18-20.1-27.8l-4-7c-5.4-9.8-10.1-20.2-13.9-30.9l26.2-24.9c12.7-12 18-28.4 17.9-43.7l0-.8 0-.8c.1-15.3-5.3-31.6-17.9-43.7L49.9 186.6c3.8-10.7 8.5-21.1 13.9-30.9l4-6.9c5.9-9.8 12.7-19.1 20.1-27.8l34.6 10.2c16.8 5 33.7 1.4 46.9-6.4l1.4-.8c13.2-7.6 24.8-20.4 28.9-37.4l8.5-35.1zM246 0c-17 0-33.6 1.7-49.8 4.8c-7.9 1.5-21.8 6.1-29.4 20.1c-2 3.7-3.6 7.6-4.6 11.8l-9.3 38.5c-.5 2-2.2 4.8-6 7c-.6 .4-1.2 .7-1.9 1.1c-3.8 2.2-7 2.3-9.1 1.7L98 73.8c-4-1.2-8.1-1.8-12.2-1.9c-16.1-.5-27 9.4-32.3 15.4c-10 11.4-19 23.8-26.9 36.9l0 0-.2 .4-4.2 7.3 0 0-.2 .4c-7.3 13.1-13.4 26.9-18.3 41.3C1 181.1-2 195.3 6.2 208.9c2.2 3.6 4.9 7 8 10L43 246.3c1.5 1.5 3 4.3 3 8.7l0 1.1 0 1.1c0 4.3-1.5 7.2-3 8.7L14.2 293.1c-3.1 3-5.8 6.4-8 10C-2 316.7 1 330.9 3.6 338.4c4.9 14.4 11 28.2 18.3 41.3l0 0 .2 .4 4.3 7.4 0 0 .2 .4c7.9 13.1 16.9 25.4 26.9 36.8c5.3 6 16.3 15.9 32.3 15.4c4.1-.1 8.2-.8 12.2-1.9L136 427c2-.6 5.3-.5 9.1 1.7c.6 .4 1.2 .7 1.9 1.1c3.8 2.2 5.5 4.9 6 7l9.3 38.5c1 4.2 2.6 8.2 4.6 11.8c7.7 14 21.6 18.5 29.4 20.1c16.1 3.2 32.8 4.8 49.8 4.8s33.6-1.7 49.8-4.8c7.9-1.5 21.8-6.1 29.4-20.1c2-3.7 3.6-7.6 4.6-11.8l9.3-38.5c.5-2 2.2-4.8 6-7c.6-.4 1.2-.7 1.9-1.1c3.8-2.2 7-2.3 9.1-1.7l38 11.2c4 1.2 8.1 1.8 12.2 1.9c16.1 .5 27-9.4 32.3-15.4c10-11.4 19-23.8 26.9-36.9l0 0 .2-.4 4.2-7.3 0 0 .2-.4c7.3-13.1 13.4-26.9 18.3-41.3c2.6-7.6 5.6-21.8-2.7-35.4c-2.2-3.6-4.9-7-8-10L449 265.7c-1.5-1.5-3-4.3-3-8.7l0-1.1 0-1.1c0-4.3 1.5-7.2 3-8.7l28.7-27.3c3.1-3 5.8-6.4 8-10c8.2-13.6 5.2-27.8 2.7-35.4c-4.9-14.4-11-28.2-18.3-41.3l0 0-.2-.4-4.2-7.3 0 0-.2-.4c-7.9-13.1-16.9-25.4-26.9-36.9c-5.3-6-16.3-15.9-32.3-15.4c-4.1 .1-8.2 .8-12.2 1.9L356 85c-2 .6-5.3 .5-9.1-1.7c-.6-.4-1.2-.7-1.9-1.1c-3.8-2.2-5.5-4.9-6-7l-9.3-38.5c-1-4.2-2.6-8.2-4.6-11.8c-7.7-14-21.6-18.5-29.4-20.1C279.6 1.7 263 0 246 0zM198 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm144 0a96 96 0 1 0 -192 0 96 96 0 1 0 192 0z"
                ></path>
              </svg>
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
            <button
              className="rounded p-1 text-black dark:text-white !text-opacity-70"
              id="headlessui-menu-button-:r3:"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="user"
                className="svg-inline--fa fa-user fa-fw fa-lg "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <nav className="flex md:hidden -mb-px px-5 md:px-10 overflow-x-auto space-x-3 text-gray-500 dark:text-gray-400 scrollbar-none">
        {Object.entries(links).map(([link, { name }]) => {
          const isActive = link === pathname;
          return (
            <Link
              key={link}
              href={link}
              className={clsx(
                "text-sm pb-3 px-1 focus:outline-none whitespace-nowrap text-black dark:text-white text-opacity-80 dark:text-opacity-80 border-b-2 border-black dark:border-white",
                { "text-neutral-100/10": !isActive }
              )}
            >
              <span className="flex-1 text-black dark:text-white text-sm font-medium">
                {name}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
