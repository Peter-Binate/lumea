// src/app/components/ui/side-information.tsx
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export interface SideInformationProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export const SideInformation = ({
  isOpen,
  onClose,
  title = 'Informations',
  footer,
  children,
}: SideInformationProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="font-medium">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Footer Actions */}
      {footer && (
        <div className="mt-auto border-t p-4">
          {footer}
        </div>
      )}
    </div>
  );
};