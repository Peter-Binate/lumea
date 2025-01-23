export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex mx-auto rounded-md bg-white border-2 border-[#eaecf0]">
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
