"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function loading() {
  return (
    <Card>
      <CardHeader className={`pb-2`}>
        <CardTitle className={`pb-2`}>We do a little loading..</CardTitle>
        <CardDescription className={`pb-2`}>😉</CardDescription>
      </CardHeader>
      <CardContent className={`pb-2`}>
        <Input className={"w-[50%]"}></Input>
      </CardContent>
    </Card>
  );
}
