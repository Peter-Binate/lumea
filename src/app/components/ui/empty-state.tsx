import { CircleXIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './button';

type ActionType = 'redirect' | 'form';

interface BaseMessage {
  title: string;
  description: string;
  buttonLabel: string;
  action: ActionType;
}

interface RedirectMessage extends BaseMessage {
  action: 'redirect';
  path: string;
}

interface FormMessage extends BaseMessage {
  action: 'form';
}

type EmptyStateMessage = RedirectMessage | FormMessage;

const emptyStateMessages: Record<'tour' | 'vehicle', EmptyStateMessage> = {
  tour: {
    title: 'Aucun tour de disponible',
    description:
      'Faite une demande en 5min dès maintenant pour que nos équipe traite votre rendu en 48 heures.',
    buttonLabel: 'Créer un tour',
    action: 'redirect',
    path: '/tours/add-tour',
  },
  vehicle: {
    title: 'Aucun véhicule de disponible',
    description:
      "Pour initier une demande d'immersion, veuilliez créer un véhicule",
    buttonLabel: 'Créer un véhicule',
    action: 'form',
  },
};

type EmptyStateType = 'tour' | 'vehicle';

interface EmptyStateProps {
  type: EmptyStateType;
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const message = emptyStateMessages[type];
  const router = useRouter();

  const handleAction = () => {
    if (message.action === 'redirect') {
      router.push(message.path);
    } else {
      onAction?.();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-50"
        aria-hidden="true"
      >
        <CircleXIcon className="text-indigo-600" size={16} />
      </div>
      <div className="text-center">
        <h3 className="mt-2 text-base font-semibold text-gray-900">
          {message.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{message.description}</p>
        <div className="mt-6">
          <Button onClick={handleAction}>
            <Plus className="mr-2" size={16} />
            {message.buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
