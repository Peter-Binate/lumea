'use client';

import { Button } from '@/app/components/ui/Button_old';
//import { Compartment, TOUR_VIEW_CHOICES, TourViewChoiceType } from '@/types/tour';
import { Edit, PlayCircle, Trash2 } from 'lucide-react';

// A DELETE DEBUT
export const TOUR_VIEW_CHOICES = {
  OUTSIDE: 0,
  INSIDE: 1,
  MOTOR: 2,
  TRUNK: 3,
  OTHER: 4,
} as const;

export type TourViewChoiceType = 
  (typeof TOUR_VIEW_CHOICES)[keyof typeof TOUR_VIEW_CHOICES];

export interface Compartment {
  id: string;
  type: TourViewChoiceType;
  isActive: boolean;
}
// A DELETE FIN

// Mapping pour les noms des compartiments
const compartmentNames: Record<TourViewChoiceType, string> = {
  [TOUR_VIEW_CHOICES.OUTSIDE]: 'Extérieur',
  [TOUR_VIEW_CHOICES.INSIDE]: 'Intérieur',
  [TOUR_VIEW_CHOICES.MOTOR]: 'Moteur',
  [TOUR_VIEW_CHOICES.TRUNK]: 'Coffre',
  [TOUR_VIEW_CHOICES.OTHER]: 'Autre',
};

interface CompartmentInformationProps {
  compartments?: Compartment[];
  onEditCompartment: (id: string) => void;
  onDeleteCompartment?: (id: string) => void;
  onRequestTour?: () => void;
}

export const CompartmentInformation = ({
  compartments,
  onEditCompartment,
  onDeleteCompartment,
  onRequestTour,
}: CompartmentInformationProps) => {
  if (!compartments || compartments.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Aucun compartiment disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Compartiment</h4>

      {/* Liste des compartiments */}
      <div className="space-y-3">
        {compartments.map((compartment) => (
          <div
            key={compartment.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6">
                <div
                  className={`h-2 w-2 rounded-full ${
                    compartment.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </div>
              <span className="text-sm">
                {compartmentNames[compartment.type]}
              </span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditCompartment(compartment.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Edit className="h-4 w-4" />
              </Button>
              {onDeleteCompartment && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteCompartment(compartment.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <PlayCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton de demande de tour */}
      {onRequestTour && (
        <Button
          variant="primary"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
          onClick={onRequestTour}
        >
          Demander un tour
        </Button>
      )}
    </div>
  );
};