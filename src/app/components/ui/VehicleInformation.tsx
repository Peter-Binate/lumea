'use client';

import { Vehicle } from '@/services/api/vehicleService';
import { X } from 'lucide-react';
import { useState } from 'react';
// import { toast } from 'sonner';
import { Button } from './Button_old';

interface VehicleInformationProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
  onDelete?: (id: string) => void;
}

export const VehicleInformation = ({
  isOpen,
  onClose,
  vehicle,
  onDelete,
}: VehicleInformationProps) => {
  // États locaux pour la gestion des actions
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!vehicle || !isOpen) return null;

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
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Titre */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {/* {vehicle.title} */}
              Peugot 307
            </h3>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Description
            </h4>
            <p className="text-sm text-gray-600">
              {/* {vehicle.description} */}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
              consectetur suscipit ducimus cupiditate rem aliquam esse dolorum!
              Quam, accusamus enim dolor fugit tempore facilis, quas vero at
              ipsam velit molestiae? Assumenda soluta a in dolore, architecto,
              tempora blanditiis adipisci dignissimos odio totam exercitationem
              nostrum debitis, fugiat voluptatibus explicabo. Voluptate ipsam
              asperiores laboriosam praesentium temporibus quibusdam eos neque
              est maiores omnis! Enim nam ex nesciunt alias odit voluptatem
              laborum ducimus pariatur quisquam. Accusantium at sit similique a
              consectetur, iste perferendis placeat nobis minus reiciendis
              aliquid! Hic voluptatum recusandae beatae. Commodi, numquam.
              Deleniti placeat ut reprehenderit! Dolorum quos porro aspernatur
              minima repellendus sed ipsam quas natus totam dolor aliquid
              dignissimos quo adipisci nulla voluptate numquam recusandae odit,
              ut magni animi? Inventore, ullam. Sunt consequuntur totam
              doloribus magni iusto quam temporibus eligendi mollitia ratione
              nesciunt doloremque placeat sapiente tempora, aperiam natus sed
              dicta accusantium autem? Rem harum aliquid possimus totam sunt
              excepturi exercitationem.
            </p>
          </div>
        </div>

        {/* Actions en bas */}
        <div className="border-t p-6">
          <div className="flex gap-4">
            {onDelete && (
              <Button
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700"
                onClick={() => onDelete(vehicle.id)}
                disabled={isDeleting || isUpdating}
              >
                Supprimer le véhicule
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
