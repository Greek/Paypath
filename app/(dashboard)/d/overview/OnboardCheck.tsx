"use client";

import { Button } from "@/components/ui/button";
import { Store } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function OnboardCheck({ store }: { store: Store | undefined }) {
  const { push } = useRouter();

  return (
    <>
      {!store?.stripeId  && (
        <>
          <Button onClick={() => push(`/ajax/stripe/auth/${store?.id}`)}>
            Connect Stripe pls
          </Button>
          <Button onClick={() => push(`/ajax/stripe/auth/${store?.id}/test`)}>
            [TEST] Connect Stripe pls
          </Button>
        </>
      )}
    </>
  );
}
