import { Bell, House, LifeBuoy, MapPin, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const NavItems = () => {
  const pathname = usePathname();

  // État pour gérer l'ouverture/fermeture du dropdown "Vos tours"
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);

  // Définition des sous-liens du dropdown "Vos tours"
  const toursSubItems = [
    {
      name: 'Propriétés',
      href: '/portfolio/properties',
      active: pathname === '/portfolio/properties',
    },
    {
      name: 'Véhicules',
      href: '/portfolio/cars',
      active: pathname === '/portfolio/cars',
    },
    {
      name: 'Monuments',
      href: '/portfolio/monuments',
      active: pathname === '/portfolio/monuments',
    },
  ];

  return [
    // Liens de navigation principaux
    {
      name: 'Dashboard',
      href: '/',
      icon: <House size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Tours',
      href: '/tours',
      icon: <House size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Portefeuilles',
      icon: <MapPin size={20} />,
      href: '/portfolio',
      active: pathname.startsWith('/portfolio'),
      position: 'top',
      isDropdown: true,
      dropdownOpen: isToursDropdownOpen,
      toggleDropdown: () => setIsToursDropdownOpen(!isToursDropdownOpen),
      subItems: toursSubItems,
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
