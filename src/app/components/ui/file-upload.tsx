import { useState } from 'react';

type FileUploadProps = {
  onFileChange: (base64: string) => void;
  className?: string;
};

export const FileUpload = ({ onFileChange, className }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setFileName(file.name);
      
      // Conversion du fichier en base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Extrait uniquement la partie base64 sans le préfixe (data:video/mp4;base64,)
        const base64String = reader.result?.toString().split(',')[1] || '';
        onFileChange(base64String);
        setIsLoading(false);
      };
      reader.onerror = () => {
        console.error('Erreur lors de la lecture du fichier');
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Erreur lors du traitement du fichier:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="flex flex-col items-center px-4 py-6 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
        <span className="text-sm font-medium text-gray-700">
          {isLoading ? 'Traitement du fichier...' : fileName || 'Sélectionner un fichier'}
        </span>
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
      {fileName && !isLoading && (
        <p className="mt-2 text-xs text-gray-500">Fichier sélectionné: {fileName}</p>
      )}
    </div>
  );
};