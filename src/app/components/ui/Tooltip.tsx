'use client';

import { cn } from '@/lib/utils/styling/class-names';
import * as React from 'react';

interface TooltipProps {
  tip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ tip, position = 'top', className, children }, ref) => {
    const positionClass = {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right',
    }[position];

    return (
      <div
        ref={ref}
        className={cn('tooltip', positionClass, className)}
        data-tip={tip}
      >
        {children}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
