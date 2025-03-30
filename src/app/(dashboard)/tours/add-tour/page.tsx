'use client';

import { TourInfoForm } from '@/app/components/forms/TourInfoForm/tour-info-form';
import { Button } from '@/app/components/ui/Button';
import { MediaUploader } from '@/app/components/ui/media-uploader';
import { useTour } from '@/lib/hooks/useTour';
import { TourFormData } from '@/types/tour';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PageTitle } from '../../../components/ui/PageTitle';

export default function AddTourPage() {
  const router = useRouter();
  const { createTour } = useTour();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    description: '',
    property_id: '',
    room_id: '',
    tour_type: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const updateFormData = (newData: Partial<TourFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine form data with uploaded files if needed
      const tourData = {
        ...formData,
        files: uploadedFiles,
      };

      const success = await createTour(formData);
      if (success) {
        router.push('/tours');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle title="Nouvelle visite" emoji="🎥" />

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-gray-200">
            <div className="p-6">
              <TourInfoForm
                formData={formData}
                updateFormData={updateFormData}
              />
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto pr-2">
              <MediaUploader onFilesUpdated={setUploadedFiles} maxFiles={20} />
            </div>
          </div>
        </div>

        <ActionButtons
          onCancel={() => router.back()}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}

// Sous-composant pour les boutons d'action
const ActionButtons = ({
  onCancel,
  isSubmitting,
}: {
  onCancel: () => void;
  isSubmitting: boolean;
}) => (
  <>
    {/* Desktop version - horizontal buttons */}
    <div className="hidden lg:flex justify-center gap-4 mt-6">
      <Button
        type="button"
        variant="outline"
        className="w-56 h-12 text-base"
        onClick={onCancel}
      >
        Annuler
      </Button>
      <Button
        type="submit"
        className="w-56 h-12 text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Création...' : 'Confirmer'}
      </Button>
    </div>

    {/* Mobile version - vertical buttons */}
    <div className="lg:hidden flex flex-col gap-4 mt-4">
      <Button
        type="submit"
        className="w-full h-12 text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Création...' : 'Confirmer'}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-base"
        onClick={onCancel}
      >
        Annuler
      </Button>
    </div>
  </>
);
