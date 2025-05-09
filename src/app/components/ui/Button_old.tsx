import { cn } from '@/lib/utils/styling/class-names'; // Fonction utilitaire pour combiner des classes
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'btn', // Classe de base pour le style de bouton
          {
            // Styles dynamiques selon les variantes
            'bg-[#5a6eb6] text-white hover:bg-indigo-700':
              variant === 'primary',
            'bg-gray-200 text-gray-700 hover:bg-gray-300':
              variant === 'secondary',
            'bg-yellow-500 text-black hover:bg-yellow-600':
              variant === 'accent',
            'bg-[#D92D20] text-white hover:bg-red-200':
              variant === 'destructive',
            'bg-transparent text-gray-600 hover:bg-gray-100':
              variant === 'ghost',
            'text-indigo-600 underline hover:text-indigo-700':
              variant === 'link',
            'border border-indigo-600 text-indigo-600 hover:bg-indigo-100':
              variant === 'outline',
            'btn-lg': size === 'lg',
            'btn-md': size === 'md',
            'btn-sm': size === 'sm',
            'btn-xs': size === 'xs',
          },
          className // Permet d'ajouter des classes personnalisées
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

