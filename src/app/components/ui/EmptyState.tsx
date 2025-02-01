import { TourType } from '@/services/api/tourService';

const emptyStateMessages = {
  property: {
    title: 'Aucun bien de disponible',
    description:
      "Pour initier une demande d'immersion, veuilliez créer un bien",
  },
  car: {
    title: 'Aucun véhicule de disponible',
    description:
      "Pour initier une demande d'immersion, veuilliez créer un véhicule",
  },
  monument: {
    title: 'Aucun monument de disponible',
    description:
      "Pour initier une demande d'immersion, veuilliez créer un monument",
  },
  object: {
    title: 'Aucun objet de disponible',
    description:
      "Pour initier une demande d'immersion, veuilliez créer un objet",
  },
};

export function EmptyState({ type }: { type: TourType }) {
  const message = emptyStateMessages[type];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          {message.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{message.description}</p>
      </div>
    </div>
  );
}
