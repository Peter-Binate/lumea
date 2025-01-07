import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

// Interface définissant les props spécifiques à notre composant Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Texte du label (optionnel)
  showLabel?: boolean; // Contrôle l'affichage du label
  error?: FieldError; // Objet d'erreur de react-hook-form
  inputSize?: 'sm' | 'md' | 'lg'; // Tailles prédéfinies disponibles
}

// Création du composant Input avec forwardRef pour la compatibilité react-hook-form
const Input = forwardRef<HTMLInputElement, InputProps>(
  // Destructuration des props avec valeurs par défaut
  (
    {
      label,
      showLabel = true,
      error,
      inputSize = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    // Classes CSS de base pour l'input
    const baseClasses =
      'border-2 border-slate-300 rounded-lg h-[42px] py-2.5 px-3.5';
    // Classes spécifiques pour chaque taille
    const sizeClasses = {
      sm: 'py-1.5',
      md: 'md:py-4',
      lg: 'py-1.5',
    };

    // Compilation des classes CSS pour l'input
    const inputClasses = `
      ${baseClasses}
      ${sizeClasses[inputSize]}
      ${error ? 'border-red-500' : 'border-slate-300'}
      ${className}
    `;

    return (
      <div className="flex flex-col mb-2">
        {/* Affichage conditionnel du label */}
        {showLabel && label && (
          <label
            htmlFor={props.id}
            className="text-sm mt-4 mb-1.5 text-slate-700 font-medium"
          >
            {label}
          </label>
        )}
        {/* Input avec toutes ses props et styles */}
        <input
          ref={ref}
          {...props}
          placeholder={!showLabel && label ? label : props.placeholder}
          className={inputClasses}
          // Ajoute l'attribut aria pour l'accessibilité en cas d'erreur
          aria-describedby={error ? `${props.name}-error` : undefined}
        />

        {/* Affichage du message d'erreur si présent */}
        {error && (
          <span
            id={`${props.name}-error`}
            className="text-red-500 text-sm mt-1"
          >
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

// Nom d'affichage pour les DevTools React
Input.displayName = 'Input';

export default Input;
