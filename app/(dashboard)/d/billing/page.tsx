import { env } from "@/env.mjs";

export default async function BillingPage() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/3`,
    { cache: "no-store" }
  );
  const data = (await res.json()) as { title: string; body: string };


  console.log(data);
  return <h1>{data.body}</h1>;
}
