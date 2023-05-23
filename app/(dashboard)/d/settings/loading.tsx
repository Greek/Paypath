"use client"

export default function loading() {
    return <Card>
    <CardHeader className={`pb-2`}>
      <CardTitle className={`pb-2`}>We do a little loading..</CardTitle>
      <CardDescription className={`pb-2`}>😉</CardDescription>
    </CardHeader>
    <CardContent className={`pb-2`}>
      <Input className={"w-[50%]"}></Input>

      <div className="mt-2">
        <span className={`text-sm text-muted-foreground`}>
          {errors?.name?.message as string}
        </span>
      </div>
    </CardContent>
    <SettingsCardFooter>
      <p>
        Make sure your store&apos;s name is at <b>most</b> 32 characters.
      </p>
      <Button size={"sm"} disabled>This button does nothing.</Button>
    </SettingsCardFooter>
  </Card>
}