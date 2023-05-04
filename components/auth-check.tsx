import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

interface AuthCheckProps {
  children: React.ReactNode | React.ReactNode[];
}

export async function AuthChecker({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return redirect("/");
  }
  return <>{children}</>;
}

// As a temporary work around, we can override the type so that it returns a JSX.Element instead of a Promise
// https://github.com/vercel/next.js/issues/42292#issuecomment-1475862471
const _AuthCheck = AuthChecker as unknown as (
  props: AuthCheckProps
) => JSX.Element;
export { _AuthCheck as AuthCheck };
