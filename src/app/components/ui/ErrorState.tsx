interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="text-center text-red-600">{message}</div>
    </div>
  );
}
