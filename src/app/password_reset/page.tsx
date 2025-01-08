'use client';

import InputOtp from '@/app/components/ui/InputOtp';
import Image from 'next/image';

interface PasswordResetProps {
  userId?: string; // Équivalent du prop Vue.js
}

const PasswordReset = ({ userId }: PasswordResetProps) => {
  return (
    <div className="flex justify-center">
      {/* Section gauche */}
      <div className="mt-14">
        <div className="flex flex-col justify-center items-center mr-4 gap-2.5 w-[584px] h-[673px]">
          <h2 className="text-black text-lg font-bold font-outfit uppercase">
            vérification otp
          </h2>
          <div className="mb-8">
            <span className="text-[#4d4c4c] text-sm font-normal font-outfit">
              Entrez l'OTP envoyé à
            </span>
            <span className="text-black text-sm font-semibold font-outfit">
              {' '}
              +33 769313910
            </span>
          </div>
          <InputOtp />
        </div>
      </div>

      {/* Section droite avec l'image */}
      <div className="flex flex-col items-center">
        <div className="mt-16">
          <Image
            src="/images/forgot_password.png"
            alt="Forgot Password Illustration"
            width={570}
            height={570}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
