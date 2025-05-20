import { CircularProgress } from "./circular-progress"; // Ajustez le chemin si nécessaire

type UploadProgressProps = {
  progress: number;
};

export const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <CircularProgress value={progress} />
      <p className="text-sm text-center mt-4 text-primary">
        Téléchargement du fichier en cours...
      </p>
    </div>
  );
};