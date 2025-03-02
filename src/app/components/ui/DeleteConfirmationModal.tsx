'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  actionName: string;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionName,
}: DeleteConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <X className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Êtes-vous sûr de vouloir {actionName}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Cette action sera irréversible.
          </p>

          <div className="flex flex-col md:flex-row w-full gap-3 justify-center">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Chargement...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
