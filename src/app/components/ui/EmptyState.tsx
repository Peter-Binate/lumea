const emptyStateMessages = {
  vehicle: {
    title: 'Aucun véhicule de disponible',
    description:
      "Pour initier une demande d'immersion, veuilliez créer un véhicule",
  },
};

export function EmptyState() {
  const message = emptyStateMessages.vehicle;

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
