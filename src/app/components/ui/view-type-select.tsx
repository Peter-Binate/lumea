'use client';

import { TOUR_VIEW_CHOICES, TourViewChoiceType } from '@/types/tour';

type ViewTypeSelectProps = {
  value: TourViewChoiceType;
  onChange: (value: TourViewChoiceType) => void;
};

export const ViewTypeSelect = ({ value, onChange }: ViewTypeSelectProps) => {
  // Conversion de l'objet TOUR_VIEW_CHOICES en tableau pour l'affichage
  const viewOptions = Object.entries(TOUR_VIEW_CHOICES).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as TourViewChoiceType)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      >
        {viewOptions.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label.toLowerCase().replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  );
};