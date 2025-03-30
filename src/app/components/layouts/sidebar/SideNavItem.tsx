'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

export interface SideNavItemProps {
  label: string;
  icon: ReactNode;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
  onClick?: () => void;
}

export const SideNavItem = ({
  label,
  icon,
  path,
  active,
  isSidebarExpanded,
  onClick,
}: SideNavItemProps) => {
  return (
    <>
      {!onClick ? (
        // Desktop version
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
      ) : (
        // Mobile version
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
    </>
  );
};

export default SideNavItem;
