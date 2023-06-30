import { APP_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const license = await prisma.license.findFirst({
    where: { id: params.id },
    include: { customer: true },
  });

  console.log(license);
  console.log(params);

  return {
    title: {
      absolute: `"${license?.customer.name}" · ${APP_NAME}`,
    },
  };
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
