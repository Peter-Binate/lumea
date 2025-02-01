import toast, { ToastPosition } from 'react-hot-toast';

interface ToastOptions {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export function useToast() {
  const showToast = ({ title, description, type }: ToastOptions) => {
    const toastOptions = {
      duration: 4000,
      position: 'top-right' as ToastPosition,
    };

    switch (type) {
      case 'success':
        toast.success(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{title}</span>
            <span className="text-sm text-gray-600">{description}</span>
          </div>,
          toastOptions
        );
        break;

      case 'error':
        toast.error(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{title}</span>
            <span className="text-sm text-gray-600">{description}</span>
          </div>,
          toastOptions
        );
        break;

      case 'info':
        toast(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{title}</span>
            <span className="text-sm text-gray-600">{description}</span>
          </div>,
          {
            ...toastOptions,
            icon: '📢',
          }
        );
        break;

      case 'warning':
        toast(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{title}</span>
            <span className="text-sm text-gray-600">{description}</span>
          </div>,
          {
            ...toastOptions,
            icon: '⚠️',
          }
        );
        break;
    }
  };

  return { toast: showToast };
}
