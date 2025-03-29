import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Lumea',
  description: 'Tableau dee bord Lumea',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="sm:h-[calc(99vh-60px)] overflow-auto border-2 border-red-500">
        <div className="w-full px-10 flex-col justify-start items-start overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
          <div className="w-full mt-[30px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
