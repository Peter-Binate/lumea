'use client';

import { Button } from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import { useTour } from '@/lib/hooks/useTour';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddTourPage() {
  const router = useRouter();
  const { createTour } = useTour();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_id: '',
    room_id: '',
  });

  // Gestionnaire de changement des champs
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await createTour(formData);
      if (success) {
        router.push('/tours');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow">
        {/* En-tête */}
        <div className="border-b px-6 py-4">
          <h1 className="text-xl font-semibold">🎥 Nouvelle visite</h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Champs du formulaire */}
            <div className="space-y-4">
              <Input
                label="Titre"
                value={formData.title}
                onChange={handleChange('title')}
                placeholder="Nom de la visite"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleChange('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Une brève description de la visite que vous souhaitez créer."
                  required
                />
              </div>

              {/* Zone de drop pour la vidéo */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <div className="text-gray-400">
                  Nous avons bien reçu (fichier) 🎉
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Création...' : 'Confirmer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
