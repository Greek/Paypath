"use client";

import SignInButton from "@/components/sign-in";
import { useEffect } from "react";

export const PurchaseLinkSignInConfrontation = ({
  callbackUri,
}: {
  callbackUri: string;
}) => {
  return (
    <div className="p-6">
      <h1 className="font-semibold text-2xl mb-2">Hold up a second!</h1>
      <p>Before you purchase this item, please sign in first!</p>
      <br />
      <SignInButton callbackUri={callbackUri} />
    </div>
  );
};
