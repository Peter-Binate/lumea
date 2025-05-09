import { Button } from '@/app/components/ui/Button_old';
import { Tour } from '@/services/api/tourService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ExternalLink, Share2, Trash2 } from 'lucide-react';
import { CompartmentInformation } from './CompartmentInformation';

interface TourInformationProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: Tour;
  onDelete?: (id: string) => Promise<void>;
}

// Configuration des statuts avec leurs styles
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

  const statusDisplay = statusConfig[tour.status] || {
    text: 'Inconnu',
    className: 'bg-gray-100 text-gray-800',
  };

  // Gestionnaire pour la demande de tour
  const handleRequestTour = () => {
    // Implémentez ici la logique pour demander un tour
    //toast.info('Demande de tour envoyée');
  };

  const handleEditCompartment = (id: string) => {
    console.log(`Editer le compartiment: ${id}`);
    
  }

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full flex flex-col">
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Informations</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fermer</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Titre et Statut */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{tour.title}</h3>
            <span
              className={`inline-flex mt-2 px-2 py-1 text-xs font-medium rounded-full ${statusDisplay.className}`}
            >
              {statusDisplay.text}
            </span>
          </div>

          {/* Informations du bien */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bien relié</p>
                <p className="text-sm font-medium">
                  {tour.car?.title || 'Non défini'}
                </p>
              </div>
            </div>
            {tour.compartment && (
              <div className="mt-4 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Accéder à la location
                </Button>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Description
            </h4>
            <p className="text-sm text-gray-600">{tour.description}</p>
          </div>

          {/* Section Compartiment */}
          <CompartmentInformation
            compartments={tour.compartment}
            onEditCompartment={handleEditCompartment}
            onRequestTour={handleRequestTour}
          />

          {/* Date de création */}
          <div>
            <p className="text-sm text-gray-600">
              Depuis le{' '}
              {format(new Date(tour.created_at), 'dd MMMM yyyy', {
                locale: fr,
              })}
            </p>
          </div>

          {/* Vidéo */}
          {tour.video && (
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400">
                  <span className="sr-only">Aperçu de la vidéo</span>
                  {/* Placeholder pour la vidéo */}
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions en bas */}
        <div className="border-t p-6">
          <div className="flex gap-4">
            {onDelete && (
              <Button
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700"
                onClick={() => onDelete(tour.id.toString())}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            )}
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
