import { PulseLoader } from "react-spinners";

export default function LoadingIndicator({ props }: { props?: any }) {
  return (
    <div className="flex items-center justify-center py-40">
      <PulseLoader {...props} />
    </div>
  );
}
