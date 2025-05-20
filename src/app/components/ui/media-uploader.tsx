"use client";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Cloud, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { UploadProgress } from "./upload-progress";

type FileWithPreview = {
  file: File;
  id: string;
  previewUrl: string;
};

type UploadStatus = "idle" | "preview" | "uploading" | "success" | "error";

type MediaUploaderProps = {
  onFileUpdated: (file: File | null) => void;
  acceptedFileTypes?: Accept;
  initialFileUrl?: string | null;
  clearFile?: boolean;
};

export const MediaUploader = ({
  onFileUpdated,
  acceptedFileTypes = { "video/*": [".mp4", ".mov", ".webm"] },
  initialFileUrl = null,
  clearFile = false,
}: MediaUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (clearFile) {
      handleRemoveFile(true);
    }
  }, [clearFile]);

  useEffect(() => {
    if (typeof onFileUpdated !== 'function') {
      console.error("onFileUpdated n'est pas une fonction :", onFileUpdated);
      return;
    }

    if (initialFileUrl && !selectedFile) {
      try {
        const placeholderFile = new File([] as BlobPart[], "fichier_existant.mp4", { type: "video/mp4" });
        
        setSelectedFile({
          id: crypto.randomUUID(),
          file: placeholderFile,
          previewUrl: initialFileUrl,
        });
        setUploadStatus("success");
      } catch (error) {
        console.error("Erreur lors de la création du file placeholder:", error);
      }
    }
  }, [initialFileUrl, onFileUpdated, selectedFile]);

  const revokePreviewUrl = useCallback((url?: string) => {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const handleRemoveFile = useCallback((isSilentClear: boolean = false) => {
    if (selectedFile) {
      revokePreviewUrl(selectedFile.previewUrl);
    }
    setSelectedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    if (!isSilentClear && typeof onFileUpdated === 'function') {
      onFileUpdated(null);
    }
  }, [selectedFile, onFileUpdated, revokePreviewUrl]);

  useEffect(() => {
    return () => {
      if (selectedFile?.previewUrl) {
        revokePreviewUrl(selectedFile.previewUrl);
      }
    };
  }, [selectedFile, revokePreviewUrl]);

  // Fonction pour gérer le changement de fichier via l'input file standard
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (!file) return;
      
      if (typeof onFileUpdated !== 'function') {
        console.error("onFileUpdated n'est pas une fonction dans handleFileChange");
        setErrorMessage("Erreur interne: gestionnaire de fichier non disponible");
        setUploadStatus("error");
        return;
      }

      if (selectedFile?.previewUrl) {
        revokePreviewUrl(selectedFile.previewUrl);
      }
      
      const newFileWithPreview = {
        file,
        id: crypto.randomUUID(),
        previewUrl: URL.createObjectURL(file),
      };
      
      setSelectedFile(newFileWithPreview);
      setUploadStatus("preview");
      setUploadProgress(0);
      setErrorMessage(null);
      onFileUpdated(file);
    },
    [onFileUpdated, revokePreviewUrl, selectedFile]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (typeof onFileUpdated !== 'function') {
        console.error("onFileUpdated n'est pas une fonction dans onDrop");
        setErrorMessage("Erreur interne: gestionnaire de fichier non disponible");
        setUploadStatus("error");
        return;
      }

      if (rejectedFiles && rejectedFiles.length > 0) {
        setErrorMessage("Type de fichier non supporté ou fichier trop volumineux.");
        setUploadStatus("error");
        setSelectedFile(null);
        onFileUpdated(null);
        return;
      }

      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (selectedFile?.previewUrl) {
          revokePreviewUrl(selectedFile.previewUrl);
        }
        
        const newFileWithPreview = {
          file,
          id: crypto.randomUUID(),
          previewUrl: URL.createObjectURL(file),
        };
        setSelectedFile(newFileWithPreview);
        setUploadStatus("preview");
        setUploadProgress(0);
        setErrorMessage(null);
        onFileUpdated(file);
      }
    },
    [onFileUpdated, revokePreviewUrl, selectedFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    noClick: true, 
    disabled: uploadStatus === "uploading" || uploadStatus === "success",
  });

  const handleChooseFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const renderContent = () => {
    switch (uploadStatus) {
      case "idle":
        return (
          <>
            <Cloud className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              Déposez votre vidéo ici ou{" "}
              <span
                className="text-primary cursor-pointer font-medium hover:underline"
                onClick={handleChooseFile}
              >
                choisissez un fichier
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Types supportés : MP4, MOV, WEBM. Max 50MB.
            </p>
            {/* Ajout d'un input file caché mais contrôlé par nous */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
              accept={Object.entries(acceptedFileTypes)
                .map(([type, exts]) => `${type},${exts.join(',')}`)
                .join(',')}
            />
          </>
        );
      case "preview":
        if (selectedFile) {
          return (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={selectedFile.previewUrl}
                className="w-full h-full object-contain rounded-md"
                controls
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveFile()}
                className="absolute top-2 right-2 bg-background/80 rounded-full p-1 shadow-md h-7 w-7"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Supprimer la vidéo</span>
              </Button>
            </div>
          );
        }
        return null;
      case "uploading":
        return <UploadProgress progress={uploadProgress} />;
      case "success":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-green-100 rounded-full p-2 mb-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Fichier {initialFileUrl && !selectedFile?.file.size ? 'existant chargé' : 'prêt à être envoyé !'}
            </p>
            {selectedFile && (
              <p className="text-xs text-muted-foreground truncate max-w-[calc(100%-2rem)]">
                {selectedFile.file.name}
              </p>
            )}
            <Button variant="link" size="sm" onClick={handleChooseFile} className="mt-3">
              Changer de fichier
            </Button>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm text-red-500 mb-2">
              {errorMessage || "Une erreur est survenue."}
            </p>
            <Button variant="outline" size="sm" onClick={handleChooseFile}>
              Réessayer
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg relative flex flex-col items-center justify-center h-64 p-4 transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
          (uploadStatus === "preview" || uploadStatus === "success") && "border-muted bg-muted/50",
          uploadStatus === "uploading" && "border-blue-300 bg-blue-50",
          uploadStatus === "error" && "border-destructive bg-destructive/5",
          (selectedFile && uploadStatus !== 'idle' && uploadStatus !== 'preview') && 'p-0',
          (selectedFile && uploadStatus === 'preview') && 'p-0 border-solid'
        )}
      >
        {renderContent()}
      </div>
    </div>
  );
};