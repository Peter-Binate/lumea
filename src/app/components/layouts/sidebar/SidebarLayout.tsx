'use client';

import { NavItems } from '@/app/components/layouts/sidebar/config';
import { useAuth } from '@/app/contexts/AuthContext';
import { cn } from '@/lib/utils/styling/class-names';
import { ChevronLeft, ChevronRight, LogOut, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import ProfileImage from '../../ui/ProfileImage';
import HeaderLayout from '../header/HeaderLayout';
import SideNavItem from './SideNavItem';

export interface ISidebarLayout {
  onToggle?: (expanded: boolean) => void;
  initialExpanded?: boolean;
}

const SidebarLayout: React.FC<ISidebarLayout> = ({
  onToggle,
  initialExpanded = true,
}) => {
  // Récupération du contexte d'authentification
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  // Récupération du chemin courant
  const pathname = usePathname();

  // States pour la gestion du sidebar et du menu mobile
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(initialExpanded);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Récupération des éléments de navigation
  const navItems = NavItems();

  // Déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Effet pour gérer le responsive sur resize
  useEffect(() => {
    const handleResize = () => {
      // Fermer le menu mobile si l'écran est plus grand que 640px
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fonction pour toggle le sidebar
  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  // Fonction pour toggle le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Ne pas afficher la sidebar pendant le chargement, sur la page de login,
  // ou si l'utilisateur n'est pas authentifié
  if (isLoading || !isAuthenticated || pathname === '/auth/login') {
    return null;
  }

  // Rendu du composant SidebarLayout
  return (
    <>
      <HeaderLayout onMenuClick={toggleMobileMenu} />

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-50 transition-transform duration-300 sm:hidden',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full w-full">
          {/* Header mobile */}
          <div className="flex justify-between items-center p-4 border-b">
            <Image
              src="/images/lumea_logo.png"
              alt="Logo Lumea"
              width={225}
              height={32.35}
              className="object-cover"
            />
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-square"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            {/* Navigation du haut */}
            <div className="mt-4">
              {navItems
                .filter((item) => item.position === 'top')
                .map((item, index) => (
                  <Fragment key={index}>
                    <SideNavItem
                      label={item.name}
                      icon={item.icon}
                      path={item.href}
                      active={item.active}
                      isSidebarExpanded={true}
                      onClick={toggleMobileMenu}
                    />
                  </Fragment>
                ))}
            </div>

            {/* Navigation du bas */}
            <div className="mt-auto">
              {navItems
                .filter((item) => item.position === 'bottom')
                .map((item, index) => (
                  <Fragment key={index}>
                    <SideNavItem
                      label={item.name}
                      icon={item.icon}
                      path={item.href}
                      active={item.active}
                      isSidebarExpanded={true}
                      onClick={toggleMobileMenu}
                    />
                  </Fragment>
                ))}
            </div>
          </div>

          {/* Section Profil mobile */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10">
                  <ProfileImage />
                </div>
                <div>
                  <p className="text-slate-700 text-sm font-semibold">
                    Olivia Rhye
                  </p>
                  <p className="text-slate-600 text-[11px] font-normal">
                    olivia@untitledui.com
                  </p>
                </div>
              </div>
              <LogOut
                className="h-[20px] hover:text-[#5a6eb6] cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div>
        <div
          className={cn(
            isSidebarExpanded ? 'w-[248px]' : 'w-[68px]',
            'border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-screen bg-white'
          )}
        >
          <aside className="flex h-full flex-col w-full break-words px-4 overflow-hidden columns-1">
            {/* Logo */}
            {isSidebarExpanded ? (
              <div className="mt-8 relative pb-2">
                <Image
                  src="/images/lumea_logo.png"
                  alt="Logo Lumea"
                  width={160}
                  height={32.35}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mt-8 relative mx-auto">
                <Image
                  src="/images/lumea_logo_icon.png"
                  alt="Icon Logo Lumea"
                  width={30}
                  height={26}
                  className="object-cover"
                />
              </div>
            )}

            {/* Navigation du haut */}
            <div className="mt-4 relative pb-2">
              <div className="flex flex-col space-y-1">
                {navItems
                  .filter((item) => item.position === 'top')
                  .map((item, index) => (
                    <Fragment key={index}>
                      <div className="space-y-1">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>

            {/* Navigation du bas */}
            <div className="sticky bottom-0 mt-auto whitespace-nowrap transition duration-200 block">
              {navItems
                .filter((item) => item.position === 'bottom')
                .map((item, index) => (
                  <Fragment key={index}>
                    <div className="space-y-1">
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                ))}
            </div>

            {/* Section profil desktop */}
            <div className="divider"></div>
            <div
              className={cn(
                'flex items-center mb-4',
                isSidebarExpanded ? 'justify-between' : 'justify-center gap-2'
              )}
            >
              {isSidebarExpanded ? (
                <>
                  <div className="w-10 h-10">
                    <ProfileImage />
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-semibold">
                      Olivia Rhye
                    </p>
                    <p className="text-slate-600 text-[11px] font-normal ">
                      olivia@untitledui.com
                    </p>
                  </div>
                  <LogOut
                    className="h-[20px] hover:text-[#5a6eb6] cursor-pointer"
                    onClick={handleLogout}
                  />
                </>
              ) : (
                <LogOut
                  className="h-[20px] hover:text-[#5a6eb6] cursor-pointer"
                  onClick={handleLogout}
                />
              )}
            </div>
          </aside>

          {/* Bouton de toggle du sidebar */}
          <div className="mt-[calc(calc(90vh)-40px)] relative">
            <button
              type="button"
              className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center border border-muted-foreground/20 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              onClick={toggleSidebar}
            >
              {isSidebarExpanded ? (
                <ChevronLeft size={16} className="stroke-foreground" />
              ) : (
                <ChevronRight size={16} className="stroke-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
