import { cn } from "@/lib/cn";
import React from "react";

export default function Masthead({
  children,
}: {
  children: React.ReactElement | React.ReactElement[] | any;
}) {
  return (
    <div className={`border-b-[.05em] border-foreground-muted w-full`}>
      <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
        {children}
      </div>
    </div>
  );
}

export const MastheadHeadingWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col pb-2", className)} {...props} />
));
MastheadHeadingWrapper.displayName = "MastheadHeadingWrapper";

export const MastheadHeading = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    className={cn(
      "font-semibold text-4xl lg:text-4xl items-center align-middle flex",
      className
    )}
    ref={ref}
    {...props}
  >
    {props.children}
  </span>
));

MastheadHeading.displayName = "MastheadHeading";

export const MastheadButtonSet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "space-x-2 align-middle items-center justify-center",
      className
    )}
    {...props}
  />
));

MastheadButtonSet.displayName = "MastheadButtonSet";

export function MastheadBodyContent({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return <div className="-mt-10 p-4">{children}</div>;
}
