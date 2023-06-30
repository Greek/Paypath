"use client";

import { Button } from "@/components/ui/button";
import { Link, Product, Store } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export const OnboardingSteps = (
  storeStore: Store & { products: Product[]; links: Link[] }
) => {
  const { push } = useRouter();

  // @ts-ignore
  const { store } = storeStore;

  useEffect(() => {
    console.log(!store.stripeId);
  }, [store]);

  return (
    <div className="-mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Ready to get started?</CardTitle>
          <CardDescription>
            You&apos;re a couple of steps away from accepting payments.
            Let&apos;s get going!
          </CardDescription>
        </CardHeader>
        <CardContent className={`p-0 mt-2 border-t`}>
          <Accordion type="single" className="w-full">
            <AccordionItem value="connect-stripe">
              <AccordionTrigger className={`px-6`}>
                Connect Stripe
              </AccordionTrigger>
              <AccordionContent className={`px-6`} forceMount>
                To begin using Paypath, you must connect a Stripe account so
                that we can process payments to your account.
                <br />
                <br />
                <Button
                  onClick={() => push(`/ajax/stripe/auth/${store?.id}`)}
                  disabled={!!store.stripeId}
                >
                  Connect Stripe
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="create-product">
              <AccordionTrigger className={`px-6`}>
                Create a product
              </AccordionTrigger>
              <AccordionContent className={`px-6`} forceMount>
                Products represent access to your Discord server and what they
                provide. You can make one so that people are able to access your
                server as well as any optional roles you&apos;d like to make
                available. You can customize which roles to give out, and more
                to come soon!
                <br />
                <br />
                <Button
                  onClick={() => push(`/d/products`)}
                  disabled={!store?.stripeId}
                >
                  Create a new product
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="create-link">
              <AccordionTrigger className={`px-6`}>
                Create a link
              </AccordionTrigger>
              <AccordionContent className={`px-6`} forceMount>
                Links are the front pages where people will purchase your
                product and get access. Go ahead and create one and share it to
                the world.
                <br />
                <br />
                <Button
                  onClick={() => push(`/d/links`)}
                  disabled={!store?.stripeId || store?.products?.length < 1}
                >
                  Create a new link
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
