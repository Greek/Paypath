import { ThemeToggle } from "../../themes-toggle";
import  { AuthCheck } from "@/components/auth-check";

export default async function dashboard({}) {
  return (
    <>
      <AuthCheck>
        <div className="flex flex-row text-center items-center">
          {/* <h1>hi {session?.user?.name}</h1> */}
          <ThemeToggle />
          <p>&nbsp; toggle theme. wow</p>
        </div>
      </AuthCheck>
    </>
  );
}
