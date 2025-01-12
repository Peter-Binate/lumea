import { cn } from '@/lib/utils';
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'btn',
          {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-accent': variant === 'accent',
            'btn-ghost': variant === 'ghost',
            'btn-link': variant === 'link',
            'btn-outline': variant === 'outline',
            'btn-lg': size === 'lg',
            'btn-md': size === 'md',
            'btn-sm': size === 'sm',
            'btn-xs': size === 'xs',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
