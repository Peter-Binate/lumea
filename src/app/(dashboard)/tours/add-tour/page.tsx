'use client';

import { TourInfoForm } from '@/app/components/forms/TourInfoForm/tour-info-form';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import { MediaUploader } from '@/app/components/ui/media-uploader';
import { useTour } from '@/lib/hooks/useTour';
import { TourFormData } from '@/types/tour';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PageTitle } from '../../../components/ui/PageTitle';

const INITIAL_FORM_STATE: TourFormData = {
  title: '',
  description: '',
  vehicle: '',
  view: 0,
};

export default function AddTourPage() {
  const router = useRouter();
  const { createTour } = useTour();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TourFormData>(INITIAL_FORM_STATE);

  const updateFormData = useCallback((newData: Partial<TourFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  const handleFileChange = useCallback(
    (files: File[]) => {
      updateFormData({ file: files[0] || undefined });
    },
    [updateFormData]
  );

  const validateForm = useCallback((): boolean => {
    if (!formData.file) {
      setFormError(
        'Veuillez sélectionner un fichier vidéo avant de soumettre le formulaire.'
      );
      return false;
    }
    return true;
  }, [formData.file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const tourData = {
        title: formData.title,
        description: formData.description,
        vehicle: formData.vehicle,
        view: formData.view,
        file: await fileToBase64(formData.file!),
      };

      const result = await createTour(tourData);

      if (result.success) {
        router.push('/tours');
      } else {
        setFormError(
          result.error ||
            'Une erreur est survenue lors de la création de la visite. Veuillez vérifier vos informations et réessayer.'
        );
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setFormError(
        "Une erreur inattendue s'est produite lors de la création de la visite. Veuillez réessayer ultérieurement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Extraction de la partie base64 (élimination du préfixe data:...)
        const base64String = reader.result?.toString().split(',')[1] || '';
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle title="Nouvelle visite" emoji="🎥" />

      {formError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-gray-200">
            <div className="p-6">
              <TourInfoForm
                formData={formData}
                updateFormData={updateFormData}
              />
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto pr-2">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Fichier vidéo
              </h2>
              <MediaUploader
                onFilesUpdated={handleFileChange}
                maxFiles={1}
                acceptedFileTypes={['.mp4', '.mov', '.webm']}
              />
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

interface ActionButtonsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const ActionButtons = ({ onCancel, isSubmitting }: ActionButtonsProps) => (
  <>
    <div className="hidden lg:flex justify-center gap-4">
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
