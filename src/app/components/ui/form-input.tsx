import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';
import { Input } from './Input';
import { Label } from './label';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  showLabel?: boolean;
}

export function FormInput({
  label,
  error,
  showLabel = true,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      {showLabel && label && (
        <Label htmlFor={props.id} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      <Input
        className={cn(
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
