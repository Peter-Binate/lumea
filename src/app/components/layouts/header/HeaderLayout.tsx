// components/layouts/header/Header.tsx
'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';

interface IHeaderLayout {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: IHeaderLayout) => {
  return (
    <header className="sm:hidden fixed top-0 left-0 right-0 h-16 border-b bg-white z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <Image
            src="/images/strata_logo_icon.png"
            alt="Icon Logo Strata"
            width={20}
            height={16}
            className="object-cover"
          />
        </div>
        <button
          onClick={onMenuClick}
          className="btn btn-ghost btn-square"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
