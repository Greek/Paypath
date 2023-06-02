"use client";

import { useForm } from "react-hook-form";

export default function CheckoutForm({ link }: { link: string }) {
  const {
    formState: { errors },
    register,
  } = useForm();

  return <form><div className={"space-y-4"}></div></form>;
}
