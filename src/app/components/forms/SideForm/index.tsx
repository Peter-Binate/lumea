'use client';

import { Button } from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import { TourType } from '@/services/api/tourService';
import { X } from 'lucide-react';
import { useState } from 'react';

interface SidebarFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  type: TourType;
}

interface FormData {
  title: string;
  room?: string;
  compartment?: string;
  description: string;
}

const formConfig = {
  property: {
    title: 'Nouvelle propriété',
    fields: ['title', 'room', 'description'],
    labels: {
      title: 'Nom de la propriété',
      room: 'Pièce',
      description: 'Description',
    },
  },
  car: {
    title: 'Nouveau véhicule',
    fields: ['title', 'compartment', 'description'],
    labels: {
      title: 'Nom du véhicule',
      compartment: 'Compartiment',
      description: 'Description',
    },
  },
  monument: {
    title: 'Nouveau monument',
    fields: ['title', 'description'],
    labels: {
      title: 'Nom du monument',
      description: 'Description',
    },
  },
  object: {
    title: 'Nouvel objet',
    fields: ['title', 'description'],
    labels: {
      title: "Nom de l'objet",
      description: 'Description',
    },
  },
};

export const SideForm = ({
  isOpen,
  onClose,
  onSubmit,
  type,
}: SidebarFormProps) => {
  // Etat initial du formulaire
  const [formData, setFormData] = useState<FormData>({
    title: '',
    ...(type === 'property' && { room: '' }),
    ...(type === 'car' && { compartment: '' }),
    description: '',
  });

  // État de chargement lors de la soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration spécifique au type de tour
  const config = formConfig[type];

  // Gestion des changements dans les champs formulaire
  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      // Réinitialiser le formulaire après la soumission réussie
      setFormData({
        title: '',
        ...(type === 'property' && { room: '' }),
        ...(type === 'car' && { compartment: '' }),
        description: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full flex flex-col">
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{config.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Champ Nom */}
            <div>
              <Input
                label={config.labels.title}
                value={formData.title}
                onChange={handleChange('title')}
                required
              />
            </div>

            {/* Champ Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {config.labels.description}
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange('description')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* Champ Room/Compartment conditionnel */}
            {(type === 'property' || type === 'car') && (
              <div>
                <Input
                  label={
                    type === 'property'
                      ? config.labels.room
                      : config.labels.compartment
                  }
                  value={
                    type === 'property' ? formData.room : formData.compartment
                  }
                  onChange={handleChange(
                    type === 'property' ? 'room' : 'compartment'
                  )}
                  required
                />
              </div>
            )}
          </div>
        </form>

        {/* Pied de formulaire avec boutons */}
        <div className="border-t p-6">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
