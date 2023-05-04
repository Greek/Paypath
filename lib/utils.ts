import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbsoluteUrl(path: string) {
  if (typeof window !== "undefined") {
    // In the browser, we return a relative URL
    return "";
  }
  // When rendering on the server, we return an absolute URL

  // reference for vercel.com
  // if (process.env.VERCEL_URL) {
  //   return `https://${process.env.VERCEL_URL}${path}`;
  // }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}
