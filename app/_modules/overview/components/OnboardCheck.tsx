"use client";

import { Button } from "@/components/ui/button";
import { Store } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function OnboardCheck({ store }: { store: Store }) {
  const { push } = useRouter();

  return (
    <>
      <Button
        onClick={() => push(`/ajax/stripe/auth/${store?.id}`)}
        disabled={!!store?.stripeId}
      >
        Connect Stripe
      </Button>
    </>
  );
}

export function LinkToProductsPage() {
  const { push } = useRouter();

  return (
    <>
      <Button onClick={() => push(`/d/products`)}>Create a new product</Button>
    </>
  );
}

export function LinkToLinksPage() {
  const { push } = useRouter();

  return (
    <>
      <Button onClick={() => push(`/d/links`)}>Create a new link</Button>
    </>
  );
}
