import { Icons } from "./icons";

export default function LoadingIndicator({ props }: { props?: any }) {
  return (
    <div className="flex justify-center items-center h-[50%]">
      <Icons.spinner className="mr-2 h-9 w-9 text-neutral-400 animate-spin" />
    </div>
  );
}
