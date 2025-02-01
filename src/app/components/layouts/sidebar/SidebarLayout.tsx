'use client';

import { NavItems } from '@/app/components/layouts/sidebar/config';
import { useAuth } from '@/app/contexts/AuthContext';
import { cn } from '@/lib/utils/styling/class-names';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import ProfileImage from '../../ui/ProfileImage';
import HeaderLayout from '../header/HeaderLayout';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  // Récupération du contexte d'authentification
  const { isAuthenticated, isLoading } = useAuth();

  // Récupération du chemin courant
  const pathname = usePathname();

  // States pour la gestion du sidebar et du menu mobile
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Récupération des éléments de navigation
  const navItems = NavItems();

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
    setIsSidebarExpanded(!isSidebarExpanded);
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
              src="/images/strata_logo.png"
              alt="Logo Strata"
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
              {navItems.map((item, index) => {
                if (item.position === 'top') {
                  return (
                    <Fragment key={index}>
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={true}
                        onClick={toggleMobileMenu}
                        isDropdown={item.isDropdown}
                        dropdownOpen={item.dropdownOpen}
                        toggleDropdown={item.toggleDropdown}
                        subItems={item.subItems}
                      />
                    </Fragment>
                  );
                }
              })}
            </div>

            {/* Navigation du bas */}
            <div className="mt-auto">
              {navItems.map((item, index) => {
                if (item.position === 'bottom') {
                  return (
                    <Fragment key={index}>
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={true}
                        onClick={toggleMobileMenu}
                        isDropdown={item.isDropdown}
                        dropdownOpen={item.dropdownOpen}
                        toggleDropdown={item.toggleDropdown}
                        subItems={item.subItems}
                      />
                    </Fragment>
                  );
                }
              })}
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
              <LogOut className="h-[20px] hover:text-[#5a6eb6] cursor-pointer" />
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
          <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
            {/* Logo */}
            {isSidebarExpanded ? (
              <div className="mt-8 relative pb-2">
                <Image
                  src="/images/strata_logo.png"
                  alt="Logo Strata"
                  width={225}
                  height={32.35}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mt-8 relative mx-auto">
                <Image
                  src="/images/strata_logo_icon.png"
                  alt="Icon Logo Strata"
                  width={20}
                  height={16}
                  className="object-cover"
                />
              </div>
            )}

            {/* Navigation du haut */}
            <div className="mt-4 relative pb-2">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => {
                  if (item.position === 'top') {
                    return (
                      <Fragment key={index}>
                        <div className="space-y-1">
                          <SideNavItem
                            label={item.name}
                            icon={item.icon}
                            path={item.href}
                            active={item.active}
                            isSidebarExpanded={isSidebarExpanded}
                            isDropdown={item.isDropdown}
                            dropdownOpen={item.dropdownOpen}
                            toggleDropdown={item.toggleDropdown}
                            subItems={item.subItems}
                          />
                        </div>
                      </Fragment>
                    );
                  }
                })}
              </div>
            </div>

            {/* Navigation du bas */}
            <div className="sticky bottom-0 mt-auto whitespace-nowrap transition duration-200 block">
              {navItems.map((item, index) => {
                if (item.position === 'bottom') {
                  return (
                    <Fragment key={index}>
                      <div className="space-y-1">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                          isDropdown={item.isDropdown}
                          dropdownOpen={item.dropdownOpen}
                          toggleDropdown={item.toggleDropdown}
                          subItems={item.subItems}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
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
                  <LogOut className="h-[20px] hover:text-[#5a6eb6] cursor-pointer" />
                </>
              ) : (
                <LogOut className="h-[20px] hover:text-[#5a6eb6] cursor-pointer" />
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

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
  onClick?: () => void;
  isDropdown?: boolean;
  dropdownOpen?: boolean;
  toggleDropdown?: () => void;
  subItems?: Array<{
    name: string;
    href: string;
    active: boolean;
  }>;
}> = ({
  label,
  icon,
  path,
  active,
  isSidebarExpanded,
  onClick,
  isDropdown,
  dropdownOpen,
  toggleDropdown,
  subItems,
}) => {
  return (
    <>
      {!onClick ? (
        // Desktop version
        <>
          {isDropdown ? (
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className={`h-full relative flex items-center whitespace-nowrap rounded-md cursor-pointer ${
                  active
                    ? 'font-base text-sm bg-neutral-200 text-[#5a6eb6] font-semibold shadow-sm hover:text-[#5a6eb6] dark:bg-[#f3f6fb] dark:hover:text-[#5a6eb6]'
                    : 'hover:bg-neutral-200 hover:hover:text-[#5a6eb6] font-semibold dark:text-slate-700 dark:hover:bg-[#f3f6fb] dark:hover:text-[#5a6eb6]'
                }`}
              >
                <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                  {isSidebarExpanded && (
                    <>
                      <span>{label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </>
                  )}
                </div>
              </div>
              {isSidebarExpanded && dropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {subItems?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`block py-1 px-2 text-sm rounded-md ${
                        subItem.active
                          ? 'bg-neutral-200 text-[#5a6eb6]'
                          : 'hover:bg-neutral-200'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Existing desktop nav item logic remains the same
            <Link
              href={path}
              className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                active
                  ? 'font-base text-sm bg-neutral-200 text-[#5a6eb6] font-semibold shadow-sm hover:text-[#5a6eb6] dark:bg-[#f3f6fb] dark:hover:text-[#5a6eb6]'
                  : 'hover:bg-neutral-200 hover:hover:text-[#5a6eb6] font-semibold dark:text-slate-700 dark:hover:bg-[#f3f6fb] dark:hover:text-[#5a6eb6]'
              }`}
            >
              <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                {icon}
                {isSidebarExpanded && <span>{label}</span>}
              </div>
            </Link>
          )}
        </>
      ) : (
        // Mobile version (similar updates needed)
        <div>
          {isDropdown ? (
            <div>
              <div
                onClick={toggleDropdown}
                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                  active
                    ? 'font-base text-sm bg-neutral-200 text-[#5a6eb6] font-semibold shadow-sm hover:text-[#5a6eb6]'
                    : 'hover:bg-neutral-200 hover:hover:text-[#5a6eb6] font-semibold dark:text-slate-700'
                }`}
              >
                <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                  <span>{label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>
              {dropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {subItems?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      onClick={onClick}
                      className={`block py-1 px-2 text-sm rounded-md ${
                        subItem.active
                          ? 'bg-red-700 text-[#5a6eb6]'
                          : 'hover:bg-neutral-200 hover:hover:text-[#5a6eb6]'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Existing mobile nav item logic remains the same
            <Link
              href={path}
              onClick={onClick}
              className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                active
                  ? 'font-base text-sm bg-neutral-200 text-[#5a6eb6] font-semibold shadow-sm hover:text-[#5a6eb6] dark:bg-[#f3f6fb] dark:hover:text-[#5a6eb6]'
                  : 'hover:bg-neutral-200 hover:hover:text-[#5a6eb6] font-semibold dark:text-slate-700 dark:hover:bg-[#f3f6fb] dark:hover:text-[#5a6eb6]'
              }`}
            >
              <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                {icon}
                <span>{label}</span>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default SidebarLayout;
