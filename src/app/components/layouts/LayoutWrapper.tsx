'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import SidebarLayout from './sidebar/SidebarLayout';
import { useState } from 'react';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Vérifier si le chemin actuel fait partie des chemins d'authentification
  const isAuthPath = pathname?.startsWith('/auth');

  // Fonction pour gérer l'état de la sidebar
  const handleSidebarToggle = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  // Si l'utilisateur est authentifié et n'est pas sur une page d'authentification, on applique le layout avec flex et sidebar
  if (isAuthenticated && !isAuthPath) {
    return (
      <div className="flex min-h-screen border-gray-50">
        <div className="fixed top-0 left-0 h-full z-10">
          <SidebarLayout
            onToggle={handleSidebarToggle}
            initialExpanded={isSidebarExpanded}
          />
        </div>

        <main
          className="flex-1 transition-all duration-300 ease-in-out
          overflow-y-auto h-screen"
          style={{
            marginLeft: isSidebarExpanded ? '248px' : '68px',
          }}
        >
          <div
            className="flex justify-center items-start 
            min-h-screen px-4"
          >
            <div className="w-full max-w-6xl">{children}</div>
          </div>
        </main>
      </div>
    );
  }

  // Sinon, on renvoie juste les enfants sans layout spécifique
  return children;
};

export default LayoutWrapper;
