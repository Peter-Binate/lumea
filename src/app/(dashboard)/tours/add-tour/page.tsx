'use client';

import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/card';
import Input from '@/app/components/ui/Input';
import { Progress } from '@/app/components/ui/progress';
import { TourTypeRadio } from '@/app/components/ui/tour-type-radio';
import { useTour } from '@/lib/hooks/useTour';
import { CheckCircle2, File, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PageTitle } from '../../../components/ui/PageTitle';

type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
  preview?: string;
  uploaded: boolean;
  error?: string;
};

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
    tour_type: '',
  });

  // State for uploaded files
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const maxFiles = 20;
  const isLimitReached = uploadedCount >= maxFiles;

  // Update of uploaded files
  useEffect(() => {
    const count = files.filter((f) => f.uploaded).length;
    setUploadedCount(count);
  }, [files]);

  const uploadFile = useCallback((fileItem: FileWithPreview) => {
    if (fileItem.uploaded) return;

    // Mise à jour de la progression par intervalles pour simuler l'upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) =>
        prev.map((f) => (f.id === fileItem.id ? { ...f, progress } : f))
      );

      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => (f.id === fileItem.id ? { ...f, uploaded: true } : f))
        );
      }
    }, 200);
  }, []);

  // Gestionnaire pour le drag and drop de fichiers
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Ne pas accepter plus de fichiers si la limite est atteinte
      if (isLimitReached) return;

      // Calculer combien de fichiers peuvent encore être acceptés
      const remainingSlots = maxFiles - uploadedCount;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const newFiles = filesToAdd.map((file) => ({
        file,
        id: crypto.randomUUID(),
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined,
        progress: 0,
        uploaded: false,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Commencer automatiquement l'upload de chaque fichier
      newFiles.forEach((fileItem) => {
        uploadFile(fileItem);
      });
    },
    [uploadedCount, isLimitReached, uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: true,
    disabled: isLimitReached,
  });

  // Suppression d'un fichier
  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((file) => file.id !== id);
      // Libérer l'URL d'objet pour éviter les fuites de mémoire
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return filtered;
    });
  };

  // Nettoyage des URL d'objets lorsque le composant se démonte
  useEffect(() => {
    return () => {
      files.forEach((fileItem) => {
        if (fileItem.preview) {
          URL.revokeObjectURL(fileItem.preview);
        }
      });
    };
  }, [files]);

  // Gestionnaire de changement des champs
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Gestionnaire pour le changement du type de tour
  const handleTourTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tourType: value,
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
    <div className="container max-w-2xl mx-auto">
      {/* En-tête */}
      <PageTitle title="Nouvelle visite" emoji="🎥" />

      {/* Formulaire */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 -mt-4">
          {/* Champs du formulaire */}
          <div className="space-b-4">
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

            {/* Champs de sélection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de tour
              </label>
              <TourTypeRadio onChange={handleTourTypeChange} />
            </div>

            {/* Zone de drop pour la vidéo */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichiers média
              </label>

              {isLimitReached ? (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Upload terminé !
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Vous avez téléchargé {maxFiles} fichiers avec succès. Merci
                    !
                  </AlertDescription>
                </Alert>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <h3 className="text-base font-medium">
                      {isDragActive
                        ? 'Déposez vos photos ici'
                        : 'Glissez & déposez des photos ici'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ou cliquez pour parcourir (JPG, JPEG, PNG)
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {uploadedCount} sur {maxFiles} photos téléchargés
                    </p>
                  </div>
                </div>
              )}

              {files.length > 0 && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {files.map((fileItem) => (
                      <Card key={fileItem.id} className="overflow-hidden">
                        <div className="relative aspect-square">
                          {fileItem.preview ? (
                            <Image
                              src={fileItem.preview || '/placeholder.svg'}
                              alt={fileItem.file.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <File className="h-10 w-10 text-muted-foreground" />
                              <span className="sr-only">
                                {fileItem.file.name}
                              </span>
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(fileItem.id);
                            }}
                            className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-foreground backdrop-blur-sm"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">
                              Supprimer le fichier
                            </span>
                          </button>
                          {fileItem.uploaded && (
                            <div className="absolute bottom-2 right-2 rounded-full bg-background/80 p-1 text-green-500 backdrop-blur-sm">
                              <CheckCircle2 className="h-3 w-3" />
                              <span className="sr-only">Téléchargé</span>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <div className="truncate text-xs font-medium">
                            {fileItem.file.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                          {!fileItem.uploaded && (
                            <Progress
                              value={fileItem.progress}
                              className="h-1 mt-2"
                            />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
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
  );
}
