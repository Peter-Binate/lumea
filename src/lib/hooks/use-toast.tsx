import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  title: string;
  description?: string;
  type: ToastType;
}

export function useToast() {
  const showToast = ({ title, description, type }: ToastOptions) => {
    const options = {
      duration: 4000,
    };

    switch (type) {
      case 'success':
        toast.success(title, {
          ...options,
          description,
        });
        break;

      case 'error':
        toast.error(title, {
          ...options,
          description,
        });
        break;

      case 'info':
        toast.info(title, {
          ...options,
          description,
        });
        break;

      case 'warning':
        toast.warning(title, {
          ...options,
          description,
        });
        break;
    }
  };

  return { toast: showToast };
}