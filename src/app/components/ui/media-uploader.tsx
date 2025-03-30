import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Card } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { CheckCircle2, File, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type FileWithPreview = {
  file: File;
  id: string;
  preview?: string;
  progress: number;
  uploaded: boolean;
  error?: string;
};

type MediaUploaderProps = {
  onFilesUpdated: (files: File[]) => void;
  maxFiles: number;
};

export const MediaUploader = ({
  onFilesUpdated,
  maxFiles,
}: MediaUploaderProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const isLimitReached = uploadedCount >= maxFiles;

  // Mise à jour du nombre de fichiers uploadés
  useEffect(() => {
    const count = files.filter((f) => f.uploaded).length;
    setUploadedCount(count);

    // Notifier le composant parent des fichiers uploadés
    const uploadedFiles = files.filter((f) => f.uploaded).map((f) => f.file);

    onFilesUpdated(uploadedFiles);
  }, [files, onFilesUpdated]);

  // Simulation d'upload de fichier
  const uploadFile = useCallback((fileItem: FileWithPreview) => {
    if (fileItem.uploaded) return;

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
      if (isLimitReached) return;

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
    [uploadedCount, isLimitReached, uploadFile, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
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

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Média</h2>

      <div className="space-y-4">
        {isLimitReached ? (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300">
              Upload terminé !
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Vous avez téléchargé {maxFiles} photos avec succès. Merci !
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
                {uploadedCount} sur {maxFiles} photos téléchargées
              </p>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <FilePreviewGrid files={files} onRemove={removeFile} />
        )}
      </div>
    </div>
  );
};

// Sous-composant pour afficher la grille de fichiers
type FilePreviewGridProps = {
  files: FileWithPreview[];
  onRemove: (id: string) => void;
};

export const FilePreviewGrid = ({ files, onRemove }: FilePreviewGridProps) => (
  <div className="mt-4">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {files.map((fileItem) => (
        <FilePreviewCard
          key={fileItem.id}
          fileItem={fileItem}
          onRemove={onRemove}
        />
      ))}
    </div>
  </div>
);

// Sous-composant pour chaque fichier
type FilePreviewCardProps = {
  fileItem: FileWithPreview;
  onRemove: (id: string) => void;
};

export const FilePreviewCard = ({
  fileItem,
  onRemove,
}: FilePreviewCardProps) => (
  <Card className="overflow-hidden">
    <div className="relative aspect-square">
      {fileItem.preview ? (
        <Image
          src={fileItem.preview || '/placeholder.svg'}
          alt={fileItem.file.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <File className="h-10 w-10 text-muted-foreground" />
          <span className="sr-only">{fileItem.file.name}</span>
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(fileItem.id);
        }}
        className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-foreground backdrop-blur-sm"
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Supprimer le fichier</span>
      </button>
      {fileItem.uploaded && (
        <div className="absolute bottom-2 right-2 rounded-full bg-background/80 p-1 text-green-500 backdrop-blur-sm">
          <CheckCircle2 className="h-3 w-3" />
          <span className="sr-only">Téléchargé</span>
        </div>
      )}
    </div>
    <div className="p-2">
      <div className="truncate text-xs font-medium">{fileItem.file.name}</div>
      <div className="text-[10px] text-muted-foreground">
        {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
      </div>
      {!fileItem.uploaded && (
        <Progress value={fileItem.progress} className="h-1 mt-2" />
      )}
    </div>
  </Card>
);
