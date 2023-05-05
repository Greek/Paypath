import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authConfig } from "./(internal)/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "@/components/sign-in";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (session?.user) redirect("/overview");

  return (
    <div className="flex flex-col px-10 py-10 min-h-screen box-border relative">
      <span className="font-semibold text-3xl">Hey there.</span>
      <div className="flex justify-center items-center h-full flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
