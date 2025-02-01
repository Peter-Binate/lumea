export interface SubNavItem {
  name: string;
  href: string;
  active: boolean;
}

export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  position: 'top' | 'bottom';
  isDropdown?: boolean;
  dropdownOpen?: boolean;
  toggleDropdown?: () => void;
  subItems?: SubNavItem[];
}
