import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      Loading
      <Skeleton className={`w-32`}/>
    </>
  );
}
