'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
    setIsChecking(false);
  }, [isAuthenticated, router]);

  if (isChecking) {
    return null; // ou un spinner de chargement
  }

  // On affiche le composant enfant si l'utilisateur est connecté
  return isAuthenticated ? children : null;
}
