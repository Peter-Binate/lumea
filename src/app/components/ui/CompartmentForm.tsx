'use client';

// import { Select } from '@/components/ui/Select';
import { useCompartment } from '@/lib/hooks/useCompartment';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import Input from './Input';

interface CompartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  property: string; // TODO: A remplacer par vehicleId
}

interface FormData {
  title: string;
  description: string;
}

export const CompartmentForm = ({
  isOpen,
  onClose,
  property, // TODO: A remplacer par vehicleId
}: CompartmentFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCompartment } = useCompartment();

  const handleChange =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const success = await createCompartment({
        ...formData,
        property: property, // TODO: remplacer par vehicle_id: vehicleId,
      });
      if (success) {
        onClose();
        setFormData({ title: '', description: '' });
      }
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
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Nouveau compartiment</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Input
              label="Nom"
              value={formData.title}
              onChange={handleChange('title')}
              required
            />

            {/* <Select
              label="Compartiment"
              value={formData.type}
              onChange={handleChange('type')}
              required
            >
              <option value="">Sélectionnez un type</option>
              {COMPARTMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange('description')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>
        </form>

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
