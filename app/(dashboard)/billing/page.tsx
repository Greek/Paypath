import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");

  const store = session.user?.stores.find((store) => {
    return store;
  });

  return (
    <>
      <h2>{store?.name}</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
            <DropdownMenu>
              <DropdownMenuTrigger>Hii</DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
