import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log("hi")

  return (
    <Button>Hi</Button>
  );
}
