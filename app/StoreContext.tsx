import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authConfig } from "./(internal)/api/auth/[...nextauth]/route";

export default async function StoreContext() {
  const session = await getServerSession(authConfig);

  return session?.user?.stores.find((store) => {
    return store.id === selectedStore;
  });
}
