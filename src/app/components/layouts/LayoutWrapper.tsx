'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import SidebarLayout from './sidebar/SidebarLayout';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Vérifier si le chemin actuel fait partie des chemins d'authentification
  const isAuthPath = pathname?.startsWith('/auth');

  // Si l'utilisateur est authentifié et n'est pas sur une page d'authentification, on applique le layout avec flex et sidebar
  if (isAuthenticated && !isAuthPath) {
    return (
      <div className="flex border-2 border-gray-200">
        <SidebarLayout />
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto">
            <div className="w-full px-10 flex-col justify-start items-start overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
              <div className="w-full mt-[30px] md:max-w-6xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sinon, on renvoie juste les enfants sans layout spécifique
  return children;
};

export default LayoutWrapper;
