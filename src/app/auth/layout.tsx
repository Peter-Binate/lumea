import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentification - Lumea',
  description: 'Connectez-vous à votre compte Lumea',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children};</>;
}
