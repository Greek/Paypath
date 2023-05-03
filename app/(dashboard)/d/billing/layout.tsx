export default function Layout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
      {children}
    </div>
  );
}
