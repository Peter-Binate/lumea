'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// Définition du schéma de validation
const otpSchema = yup.object().shape({
  otp: yup.string().required('Le code OTP est requis'),
});

interface InputOtpProps {
  length?: number;
}

const InputOtp = ({ length = 4 }: InputOtpProps) => {
  // États
  const [otpArray, setOtpArray] = useState<string[]>(
    new Array(length).fill('')
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration du formulaire
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(otpSchema),
    mode: 'onChange',
  });

  // Gestion de la saisie OTP
  const handleOtpChange = (index: number, value: string) => {
    const newArray = [...otpArray];
    newArray[index] = value;
    setOtpArray(newArray);

    // Met à jour la valeur dans react-hook-form
    setValue('otp', newArray.join(''));
    trigger('otp');
  };

  // Gestion des touches (similaire à la version Vue)
  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputs = containerRef.current?.getElementsByTagName('input');
    if (!inputs) return;

    const keypressed = e.key;

    if (index > 0 && (keypressed === 'Backspace' || keypressed === 'Delete')) {
      handleOtpChange(index, '');
      setTimeout(() => {
        inputs[index - 1].focus();
      }, 100);
    } else {
      const matched = keypressed.match(/^[0-9]$/);
      if (!matched) {
        handleOtpChange(index, '');
        return;
      } else if (index < length - 1) {
        setTimeout(() => {
          inputs[index + 1].focus();
        }, 100);
      }
    }
  };

  // Gestion de la soumission
  const onSubmit = (data: { otp: string }) => {
    console.log('OTP soumis :', data.otp);
    // Ajoutez ici la logique de soumission
  };

  // Gestion du renvoi de code
  const handleResendOtp = () => {
    console.log('Renvoi du code OTP');
    // Ajoutez ici la logique de renvoi
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div
        ref={containerRef}
        className="flex flex-col justify-between items-center"
      >
        <div className="flex gap-2">
          {Array.from({ length }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={otpArray[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              className="w-14 h-14 mx-2 bg-gray-200 text-center
                       rounded-lg shadow-inner border border-gray-300
                       py-2.5 px-3.5"
              aria-describedby="otp-error"
            />
          ))}
        </div>

        {errors.otp && (
          <p id="otp-error" className="mt-1 text-sm text-red-500">
            {errors.otp.message}
          </p>
        )}
      </div>

      {/* Bouton de renvoi et texte d'expiration */}
      <div className="text-center mt-6 text-base">
        <button
          type="button"
          onClick={handleResendOtp}
          className="text-[#475466] underline leading-normal font-normal font-inter"
        >
          Envoyer à nouveau
        </button>
        <span className="text-[#475466] text-base font-normal font-inter leading-normal">
          {' '}
          dans 28 s
        </span>
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition-colors"
      >
        Se connecter
      </button>
    </form>
  );
};

export default InputOtp;
