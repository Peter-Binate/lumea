'use client';

import { TourInfoForm } from '@/app/components/forms/TourInfoForm/tour-info-form';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import { MediaUploader } from '@/app/components/ui/media-uploader';
import { PageTitle } from '@/app/components/ui/PageTitle';
import { useTour } from '@/lib/hooks/useTour';
import { TourFormData } from '@/types/tour';
import { FileIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

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
  (file: File | null) => {
    if (file instanceof File) {
      console.log('Fichier sélectionné:', file.name);
      updateFormData({ file: file });
    } else { 
      console.warn('Aucun fichier valide reçu ou fichier supprimé');
      updateFormData({ file: undefined });
    }
  },
  [updateFormData] // La dépendance est correcte
);

  const validateForm = useCallback((): boolean => {
    // Réinitialiser toute erreur précédente
    setFormError(null);

    // Vérification du titre
    if (!formData.title.trim()) {
      setFormError('Le titre est obligatoire.');
      return false;
    }

    // Vérification du véhicule
    if (!formData.vehicle) {
      setFormError('Veuillez sélectionner un véhicule.');
      return false;
    }

    // Vérification du fichier
    if (!formData.file) {
      setFormError(
        'Veuillez sélectionner un fichier vidéo avant de soumettre le formulaire.'
      );
      return false;
    }

    return true;
  }, [formData.title, formData.vehicle, formData.file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    console.log('État du formulaire avant validation:', formData);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // S'assurer que le fichier existe avant la conversion
      if (!formData.file) {
        throw new Error('Le fichier est manquant');
      }

      // Convertir le fichier en base64
      const base64File = await fileToBase64(formData.file);
      console.log(
        'Fichier converti en base64',
        base64File.substring(0, 50) + '...'
      );

      const tourData = {
        title: formData.title,
        description: formData.description,
        vehicle: formData.vehicle,
        view: formData.view,
        file: base64File,
      };

      console.log('Données à envoyer:', {
        ...tourData,
        file: tourData.file
          ? `${tourData.file.substring(0, 20)}... (tronqué)`
          : null,
      });

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
        error instanceof Error
          ? `Erreur: ${error.message}`
          : "Une erreur inattendue s'est produite lors de la création de la visite. Veuillez réessayer ultérieurement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = async (file: File): Promise<string> => {
    if (!file || !(file instanceof File)) {
      throw new Error("L'objet fourni n'est pas un fichier valide");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      try {
        reader.readAsDataURL(file);

        reader.onload = () => {
          try {
            if (!reader.result) {
              reject(new Error('Échec de la lecture du fichier'));
              return;
            }

            // Extraction de la partie base64 (élimination du préfixe data:...)
            const dataUrl = reader.result.toString();
            const base64 = dataUrl.split(',')[1];

            if (!base64) {
              reject(
                new Error(
                  'Format de fichier invalide pour la conversion en base64'
                )
              );
              return;
            }

            resolve(base64);
          } catch (error) {
            console.error('Erreur lors du traitement du résultat:', error);
            reject(error);
          }
        };

        reader.onerror = (event) => {
          console.error('Erreur lors de la lecture du fichier:', event);
          reject(new Error('Erreur lors de la lecture du fichier'));
        };
      } catch (error) {
        console.error(
          "Exception lors de l'initialisation de la lecture:",
          error
        );
        reject(error);
      }
    });
  };

  const renderFilePreview = () => {
    if (!formData.file) return null;

    return (
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <div className="flex items-center">
          <FileIcon className="h-5 w-5 text-blue-500 mr-2" />
          <div className="text-sm">
            <p className="font-medium text-blue-700">{formData.file.name}</p>
            <p className="text-blue-600 text-xs">
              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      </div>
    );
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
                onFileUpdated={handleFileChange}
                acceptedFileTypes={{ 'video/*': ['.mp4', '.mov', '.webm'] }}
              />
              {formData.file && renderFilePreview()}
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
