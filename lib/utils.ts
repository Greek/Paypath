"use client"

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchAbsoluteUrl = (path: string) => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://gatekeep.vercel.app"; // https://v2ds.netlify.app

  return base_url + path;
};

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useKeyPress = (keys: [any], callback: any, node = null) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event: any) => {
      // check if one of the key is part of the ones we want
      if (!(event.metaKey || event.ctrlKey) && keys.some((key) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    // attach the event listener
    targetNode && targetNode.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () =>
      targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, node]);
};
