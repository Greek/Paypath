import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "@/components/sign-in";

export default async function Home({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const time = new Date().getHours();
  const session = await getServerSession(authConfig);
  if (session?.user) redirect("/d/overview");

  return (
    <div className="flex flex-col px-10 py-10 min-h-screen box-border relative">
      <span className="font-semibold text-3xl">
        {time < 12 && "Good morning."}{" "}
        {time > 12 && time <= 17 ? "Good afternoon." : null}
        {time > 17 && "Good evening."}
      </span>
      <div className="flex justify-center items-center h-full flex-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Gatekeep</CardTitle>
            <CardDescription>
              Manage access to your Discord server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton />
            {searchParams.error == "AccessDenied" && (
              <p className="text-red-700 text-sm pt-3">
                You are not authorized to sign in.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: { error: string };
// }) {
//   const [time, setTime] = useState<number>();
//   const session = useSession();

//   useEffect(() => {
//     setTime(new Date().getHours());
//   }, []);

//   useEffect(() => {
//     if (session?.data?.user) redirect("/d/overview");
//   }, [session]);

//   return (
//     <div className="flex flex-col px-10 py-10 min-h-screen box-border relative">
//       <span className="font-semibold text-3xl">
//         {time < 12 && "Good morning."}{" "}
//         {time > 12 && time <= 17 ? "Good afternoon." : null}
//         {time > 17 && "Good evening."}
//       </span>
//       <div className="flex justify-center items-center h-full flex-1">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle>Gatekeep</CardTitle>
//             <CardDescription>
//               Manage access to your Discord server.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <SignInButton />
//             {searchParams.error == "AccessDenied" && (
//               <p className="text-red-700 text-sm pt-3">
//                 You are not authorized to sign in.
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
