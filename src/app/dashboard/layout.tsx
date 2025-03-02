import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Lumea',
  description: 'Tableau dee bord Lumea',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
