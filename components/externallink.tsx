import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

const ExternalLinkTo = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href, ...props }, ref) => (
  <Link
    href={href as Url}
    ref={ref}
    className={cn(`flex flex-row underline underline-offset-4`, className)}
    {...props}
  >
    {props.children}
    <ArrowUpRight size={17} className={`ml-[.2em]`} />
  </Link>
));

ExternalLinkTo.displayName = "ExternalLinkTo";

export { ExternalLinkTo };
