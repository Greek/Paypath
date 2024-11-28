import { ReactNode } from "react";

export const LargeCard = ({ children }: { children: ReactNode[] }) => {
  return (
    <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
      {children}
    </div>
  );
};

export const LargeCardHeader = ({ children }: { children: ReactNode[] }) => {
  return (
    <div className="flex items-center p-5 bg-gray-50 dark:bg-gray-800">
      {children}

      <div className="flex w-full items-center">
        <div className="grow border-t" aria-hidden="true"></div>
        <div className="grow border-t" aria-hidden="true"></div>
      </div>
    </div>
  );
};
