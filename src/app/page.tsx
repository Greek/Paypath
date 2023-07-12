import { redirect } from "next/navigation";
import Image from "next/image";
import font from "next/font/local";
import { auth } from "./auth";
import { LandingInviteButton } from "./LandingInviteButton";
import { ExternalLinkTo } from "@/components/externallink";

const pretendard = font({
  src: "../../public/assets/fonts/pretendard/PretendardVariable.woff2",
});

export default async function Home({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const session = await auth();
  if (session) redirect("/d/overview");

  return (
    <div
      className={`mx-8 max-w-2xl space-y-6 p-8 lg:py-10 ${pretendard.className}`}
    >
      <Image
        alt="Paypath logo"
        src={`/assets/Paypath enlarged 2.png`}
        width={52}
        height={52}
        className="rounded-md"
      ></Image>
      <h1 className={`text-2xl font-[500] dark:text-white/80`}>
        A new way to sell your online chatrooms and resources.
      </h1>
      <div
        className={`space-y-4 break-words text-base font-[300] text-black/50 dark:text-white/70`}
      >
        <p>
          Finding ways to monitize your business is hard, especially when trying
          to find the right platform to do it for you. Trust me, We&apos;ve been
          there.
        </p>
        <p>
          Paypath allows you to monitize online chatrooms and other kinds of
          resources all in one place, with the help of{"  "}
          <ExternalLinkTo href="https://stripe.com"> Stripe</ExternalLinkTo> to
          handle transactions. We want to enable individuals and businesses to
          grow without any of the bloat and filler that comes with other
          services. That&apos;s why we&apos;re building Paypath.
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
