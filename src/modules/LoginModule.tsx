import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/app/i/login/forms/login";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginModule({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <>
    <div className="flex h-10 items-center justify-center bg-[#cf2929] p-4 text-black dark:bg-yellow-400">
          <p>
            Paypath is no longer maintained and may break at any moment. Live
            transactions are not processed. <b>Use at your own risk.</b>
          </p>
        </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to continue
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in with Discord to continue using Paypath.
              </p>
            </div>
            <UserAuthForm />
            {searchParams.error == "AccessDenied" && (
              <p className="pt-3 text-sm text-red-700">
                You are not authorized to sign in.
              </p>
            )}
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
