import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tour } from '@/services/api/tourService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CarFront, ExternalLink, Play, X } from 'lucide-react';

interface TourInformationProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: Tour;
  onDelete?: (id: string) => Promise<void>;
}

// Configuration des statuts avec leurs styles
const statusConfig: Record<number, { text: string; className: string }> = {
  0: { text: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  1: { text: 'Envoyé', className: 'bg-blue-100 text-blue-800' },
  2: { text: 'En cours', className: 'bg-purple-100 text-purple-800' },
  3: { text: 'En révision', className: 'bg-orange-100 text-orange-800' },
  4: { text: 'Approuvé', className: 'bg-green-100 text-green-800' },
  5: { text: 'Rejeté', className: 'bg-red-100 text-red-800' },
};

export const TourInformation = ({
  isOpen,
  onClose,
  tour,
  onDelete,
}: TourInformationProps) => {
  console.log('TourInformation rendu, isOpen =', isOpen, 'tour =', tour);
  if (!tour || !isOpen) return null;

  console.log('Structure de tour.vehicle:', tour.vehicle);

  const statusDisplay = statusConfig[tour.status] || {
    text: 'Inconnu',
    className: 'bg-gray-100 text-gray-800',
  };

  const formattedDate = `Depuis le ${format(
    new Date(tour.created_at),
    'dd MMMM yyyy',
    {
      locale: fr,
    }
  )}`;

  const getVehicleTitle = (vehicle: Tour['vehicle']): string => {
    if (!vehicle) return 'Non défini';
    if (typeof vehicle === 'object' && 'title' in vehicle) return vehicle.title;
    return 'Non défini';
  };
  
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-medium">Informations</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Title and Status */}
        <div className="flex flex-col items-center justify-center pt-6 pb-4">
          <h1 className="text-[18px] font-medium text-center text-gray-800 mb-2">
            {tour.title}
          </h1>
          <Badge variant="secondary" className={statusDisplay.className}>
            {statusDisplay.text}
          </Badge>
        </div>

        {/* Property Info */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-2 rounded-md mr-3">
              <CarFront className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Véhicule relié</p>
              <p className="font-medium">
                {getVehicleTitle(tour.vehicle)}
              </p>
            </div>
            <div className="text-xs text-gray-500 self-start mt-1">
              {formattedDate}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-blue-600 border-blue-200"
            onClick={() =>
              console.log(`Accéder au véhicule: ${
                typeof tour.vehicle === 'object' ? 
                  tour.vehicle.id : 
                  tour.vehicle
                }`)
            }
          >
            Accéder à la location <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Description */}
        <div className="px-6 py-4 border-b">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-sm text-gray-600">{tour.description}</p>
        </div>

        {/* Video Preview */}
        {tour.video && (
          <div className="p-6">
            <div className="relative bg-[#F8FAFC] h-48 rounded-md overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Play className="h-5 w-5 text-white" fill="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto border-t p-4 flex gap-3">
        {onDelete && (
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onDelete(tour.id.toString())}
          >
            Supprimer
          </Button>
        )}
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => console.log(`Partager le tour: ${tour.id}`)}
        >
          Partager
        </Button>
      </div>
    </div>
  );
};
