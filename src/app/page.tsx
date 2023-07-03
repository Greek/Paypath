import { redirect } from "next/navigation";
import Image from "next/image";
import font from "next/font/local";
import { Roboto } from "next/font/google";
import { auth } from "./auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LandingInviteButton } from "./LandingInviteButton";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });
const robotoBold = Roboto({ subsets: ["latin"], weight: "500" });

export default async function Home({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const session = await auth();
  if (session) redirect("/d/overview");

  return (
    <div
      className={`mx-14 max-w-2xl -px-8 py-8 space-y-6 lg:py-0 lg:py-14 ${roboto.className}`}
    >
      <Image
        alt="Paypath logo"
        src={`/assets/Paypath enlarged 2.png`}
        width={52}
        height={52}
        className="rounded-md"
      ></Image>
      <h1
        className={`text-2xl font-[525] dark:text-white/80 ${robotoBold.className}`}
      >
        A new way to monitize your Discord server.
      </h1>
      <div
        className={`text-base font-[300] text-black/50 dark:text-white/70 space-y-4 break-words ${roboto.className}`}
      >
        <p>
          Finding ways to monitize your business is hard, especially when trying
          to find the right platform to do it for you. Trust me, We&apos;ve been
          there. Fees, subscriptions, slow UI and overall bad experiences. You
          name it. So we decided to take action.
        </p>
        <p>
          Paypath allows you to monitize your Discord server and other kinds of
          resources all in one place. We want to enable individuals and
          businesses to grow without any of the bloat and filler that comes with
          other services. That&apos;s why we&apos;re building Paypath.
        </p>
        <p>
          We want you to join the journey in building Paypath. Tell us what we
          need to know and what you&apos;re looking for in our service. Join us.
        </p>
        <LandingInviteButton />
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
