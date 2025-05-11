import { useState } from 'react';

type DeleteHandler<T> = (id: string) => Promise<boolean>;

interface UseDeleteOptions {
  onDeleteSuccess?: () => void;
}

export function useDelete<T>(
  deleteFunction: DeleteHandler<T>,
  options?: UseDeleteOptions
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Afficher la modale de confirmation avant supression
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  // Execution de la supression après confirmation
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return false;
    
    try {
      setIsDeleting(true);
      const success = await deleteFunction(itemToDelete);
      
      if (success) {
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
        
        // Exécuter le callback de succès si fourni
        if (options?.onDeleteSuccess) {
          options.onDeleteSuccess();
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return {
    isDeleteModalOpen,
    itemToDelete,
    isDeleting,
    handleDeleteClick,
    handleConfirmDelete,
    closeDeleteModal
  };
}