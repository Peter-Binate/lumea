import {
  Bell,
  Car,
  Clapperboard,
  House,
  LifeBuoy,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export const NavItems = () => {
  const pathname = usePathname();

  return [
    // Liens de navigation principaux
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <House size={20} />,
      active: pathname === '/dashboard',
      position: 'top',
    },
    {
      name: 'Tours',
      href: '/tours',
      icon: <Clapperboard size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Véhicules',
      href: '/cars',
      icon: <Car size={20} />,
      active: pathname === '/cars',
      position: 'top',
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: <Bell size={20} />,
      active: pathname === '/notifications',
      position: 'top',
    },
    // Liens de navigation du bas
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
