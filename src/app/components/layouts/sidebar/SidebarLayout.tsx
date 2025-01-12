'use client';

import { NavItems } from '@/app/components/layouts/sidebar/config';
import { useAuth } from '@/app/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import ProfileImage from '../../ui/ProfileImage';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navItems = NavItems();
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  // Ne pas afficher la sidebar pendant le chargement, sur la page de login,
  // ou si l'utilisateur n'est pas authentifié
  if (isLoading || !isAuthenticated || pathname === '/auth/login') {
    return null;
  }

  return (
    <div>
      <div
        className={cn(
          isSidebarExpanded ? 'w-[248px]' : 'w-[68px]',
          'border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-screen bg-white'
        )}
      >
        <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
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
          {/* Top */}
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
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          {/* Bottom */}
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
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
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
  );
};

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
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
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <Link
          href={path}
          className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
            active
              ? 'font-base text-sm bg-neutral-200 hover:text-[#5a6eb6] dark:bg-[#f3f6fb] dark:text-[#5a6eb6]'
              : 'hover:bg-neutral-200 hover:hover:text-[#5a6eb6] font-semibold dark:text-slate-700 dark:hover:bg-[#f3f6fb] dark:hover:text-white'
          }`}
        >
          <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
            {icon}
          </div>
        </Link>
      )}
    </>
  );
};

export default SidebarLayout;
