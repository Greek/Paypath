export default function StoreLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div
      className={`md:min-h-screen relative overflow-x-hidden flex flex-col justify-center`}
    >
      <div className="relative md:mx-auto md:max-w-3xl sm:rounded-lg overflow-hidden sm:border shadow-xl">
        {children}
      </div>
    </div>
  );
}
