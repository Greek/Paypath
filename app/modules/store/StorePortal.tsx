"use client";

import { License, Store, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Clipboard, User as UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function StorePortal({ params }: { params: { name: string } }) {
  const { data: session } = useQuery(["session"], {
    queryFn: async () => {
      return (await axios.get(`/ajax/self`)).data as User & { licenses: License[]};
    },
  });
  const { data: store } = useQuery(["store"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/${params.name}`)).data as Store;
    },
  });

  return session && store ? (
    <>
      <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <div className="w-full">
          <div className="flex items-center p-5 bg-gray-50 dark:bg-gray-800">
            <div
              className="inline-block shrink-0 leading-none overflow-hidden rounded-full border"
              style={{ width: "70px", height: "70px" }}
            >
              <Image
                src={session?.image as string}
                alt={`${session?.name}'s profile picture`}
                width={70}
                height={70}
              ></Image>
            </div>
            <div className="ml-3 overflow-hidden">
              <div className="text-black dark:text-white truncate text-xl font-semibold">
                {session?.name}
              </div>
              <div className="flex flex-row gap-1">
                <div className="text-black dark:text-white truncate text-sm w-36 !text-opacity-50">
                  {session?.email}
                </div>
                <div className="text-black dark:text-white truncate text-sm !text-opacity-50">
                  {" "}
                  |{" "}
                </div>
                <span className="text-blue-500 dark:text-blue-400 cursor-pointer text-black dark:text-white text-sm">
                  Sign out
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center">
            <div className="grow border-t" aria-hidden="true"></div>
            <div className="grow border-t" aria-hidden="true"></div>
          </div>
          <div className="min-h-[20rem] h-full p-5">
            <div className="space-y-3">
              {session?.licenses ? session?.licenses.map((license) => {
                return (
                  <>
                    <div className="transition ring-1 ring-black border-black dark:border-gray-500 dark:ring-gray-500 relative bg-white dark:bg-gray-800 border shadow-sm rounded-md">
                      <div className="px-3 py-2 flex items-center">
                        <div
                          className="inline-block shrink-0 leading-none overflow-hidden rounded border"
                          style={{ width: "40px", height: "40px" }}
                        >
                          <div className="w-full h-full flex items-center justify-center text-black dark:text-white !text-opacity-30">
                            <UserIcon size={16} />
                          </div>
                        </div>
                        <div className="pl-3">
                          <div className="text-black dark:text-white font-mono">
                            {license.key}
                          </div>
                          <div className="text-black dark:text-white text-sm !text-opacity-50">
                            June 13, 2023
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }): null}
            </div>
          </div>
        </div>
        <div className="p-5 md:p-10 space-y-5">
          <div>
            <div className="relative bg-white dark:bg-gray-800 border shadow-sm rounded-md">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-t-md border-b p-3 flex items-center justify-between">
                <div className="text-black dark:text-white text-lg font-medium">
                  Membership
                </div>
              </div>
              <div className="divide-y">
                <div className="px-3 py-2 flex justify-between items-center">
                  <div className="text-black dark:text-white text-sm font-medium !text-opacity-70">
                    License key
                  </div>
                  <div className="flex items-center">
                    <div className="text-black dark:text-white truncate text-sm !text-opacity-50">
                      ACP-UYQO-7D33-ESF0-3VSP
                      <button type="button" className="ml-2">
                        <Clipboard size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 flex justify-between items-center">
                  <div className="text-black dark:text-white text-sm font-medium !text-opacity-70">
                    Product
                  </div>
                  <div className="flex items-center">
                    <div className="text-black dark:text-white truncate text-sm !text-opacity-50">
                      test1
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 flex justify-between items-center">
                  <div className="text-black dark:text-white text-sm font-medium !text-opacity-70">
                    Price
                  </div>
                  <div className="text-black dark:text-white truncate text-sm !text-opacity-50">
                    Free
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex space-x-3">
              <button
                type="button"
                className="w-full px-3 h-8 text-sm rounded-md bg-[rgb(88_101_242)] text-white shadow-sm hover:shadow focus:shadow active:shadow-none box-border relative after:absolute inline-flex items-center align-middle min-w-min select-none outline-none justify-center text-center whitespace-nowrap transition appearance-none focus:outline-none font-medium"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="discord"
                  className="svg-inline--fa fa-discord mr-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width={16}
                  height={16}
                >
                  <path
                    fill="currentColor"
                    d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
                  ></path>
                </svg>
                Claim Roles
              </button>
            </div>
            <div className="flex space-x-3"></div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
