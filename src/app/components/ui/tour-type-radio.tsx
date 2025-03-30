'use client';

import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { CarFrontIcon, Footprints, PlaneIcon, RecycleIcon } from 'lucide-react';
import { useState } from 'react';

interface TourTypeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const TourTypeRadio = ({
  onChange,
}: {
  onChange?: (value: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: TourTypeOption[] = [
    {
      id: 'walk',
      label: 'Walk',
      icon: <Footprints className="h-6 w-6 sm:h-8 sm:w-8" />,
    },
    {
      id: 'bike',
      label: 'Bike',
      icon: <RecycleIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    },
    {
      id: 'car',
      label: 'Drive',
      icon: <CarFrontIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    },
    {
      id: 'fly',
      label: 'Fly',
      icon: <PlaneIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    },
  ];

  const handleValueChange = (value: string) => {
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioGroup
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-full mb-2"
      onValueChange={handleValueChange}
    >
      {options.map((option) => (
        <div key={option.id} className="relative">
          <RadioGroupItem
            value={option.id}
            id={option.id}
            className="peer sr-only border border-blue-900"
          />
          <Label
            htmlFor={option.id}
            className={cn(
              'flex flex-col items-center justify-center gap-2 w-full sm:w-[100px] h-[80px] sm:h-[93px] border-2 rounded-lg cursor-pointer transition-all',
              'hover:bg-blue-100 hover:border-blue-400 dark:hover:bg-blue-950 dark:hover:border-blue-600',
              'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500',
              selectedOption === option.id
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400'
                : 'border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300'
            )}
          >
            {option.icon}
            <span className="font-medium text-center text-xs sm:text-sm">
              {option.label}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
