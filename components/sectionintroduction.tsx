export function SectionIntroductionIcon({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div
      className={`flex justify-center items-center rounded-md bg-gray-100 dark:bg-slate-900 text-gray-400 border w-12 h-12`}
    >
      {children}
    </div>
  );
}
export function SectionIntroductionHeading({
  children,
}: {
  children: React.ReactElement | string;
}) {
  return (
    <h3 className="text-xl dark:text-slate-200 font-semibold mb-0 mt-2">
      {children}
    </h3>
  );
}
export function SectionIntroductionDescription({
  children,
}: {
  children: React.ReactElement[] | JSX.Element[] | string;
}) {
  return <p className="text-sm dark:text-slate-300">{children}</p>;
}

export function SectionIntroduction({
  children,
}: {
  children: React.ReactElement[] | JSX.Element;
}) {
  return (
    <div className="grid gap-x-6 gap-y-3 px-10 mx-10 md:px-12 md:mx-12 lg:mx-32 lg:px-32 xl:mx-52 xl:px-52 pt-20 mt-4">
      <div className="flex flex-col justify-center md:max-w-sm px-3">
        <div className="prose">{children}</div>
      </div>
    </div>
  );
}
