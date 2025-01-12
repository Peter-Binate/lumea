import { Bell, House, LifeBuoy, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Dashboard',
      href: '/',
      icon: <House size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: <Bell size={20} />,
      active: pathname === '/notifications',
      position: 'top',
    },
    {
      name: 'Portefeuilles',
      href: '/portfolio',
      icon: <House size={20} />,
      active: pathname === '/portfolio',
      position: 'top',
    },
    {
      name: 'Support',
      href: '/support',
      icon: <LifeBuoy size={20} />,
      active: pathname === '/support',
      position: 'bottom',
    },
    {
      name: 'Paramètres',
      href: '/settings',
      icon: <Settings size={20} />,
      active: pathname === '/settings',
      position: 'bottom',
    },
  ];
};
