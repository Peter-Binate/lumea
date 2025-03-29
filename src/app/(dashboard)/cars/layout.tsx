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
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl border-2 border-red-500">
        {children}
      </div>
    </div>
  );
}
