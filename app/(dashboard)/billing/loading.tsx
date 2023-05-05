import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className={`w-[200px] h-4`} />
          </CardTitle>
          <CardDescription>
            <Skeleton className={`w-[150px] h-4`} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className={`w-[300px] h-4`} />
        </CardContent>
        <CardFooter>
          <Skeleton className={`w-[100px] h-4`} />
        </CardFooter>
      </Card>
      
    </div>
  );
}
