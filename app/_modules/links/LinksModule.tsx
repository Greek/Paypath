"use client"

import { Button } from "@/components/ui/button";
import { Book, Plus} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LinksModule() {
  const router = useRouter()

  return (
    <div className="grid gap-x-6 gap-y-3 px-52 mx-64 pt-20 mt-4">
      <div className="flex flex-col justify-center max-w-sm px-3">
        <div
          className={`flex justify-center items-center rounded-md bg-gray-100 text-gray-400 border w-12 h-12 mb-2`}
        >
          <Book size={24} />
        </div>
        <div className="prose">
          <h3 className="mb-0">Start collecting payments.</h3>
          <p className="text-sm">
            Links are where your audience will purchase access to your products, a.k.a., your server.
          </p>
          <Button onClick={() => {router.push('/d/links/new')}}>
            <Plus scale={16} className="mr-2" />
            Create Link
          </Button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
