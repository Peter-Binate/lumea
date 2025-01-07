'use client';

import Input from '@/app/components/ui/Input';
import { LoginFormData } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis'),
});

interface LoginProps {
  onSubmit?: (data: LoginFormData) => void; // Prop rendue optionnelle avec ?
}

const LoginPage: React.FC<LoginProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const handleLogin = (data: LoginFormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      // Logique par défaut si onSubmit n'est pas fourni
      console.log('Données de connexion:', data);
    }
  };

  return (
    <div className="mt-10 max-w-screen-lg sm:max-w-full min-h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-center">
      {/* Section gauche : formulaire */}
      <div className="flex-1 max-w-[584px]">
        {/* En-tête */}
        <h2 className="text-4xl sm:text-5xl font-bold gap-5 mb-2 sm:mb-5">
          Content de vous revoir !
        </h2>
        <p className="mt-0 mb-12 text-md md:text-2xl lg:text-2xl">
          Connectez-vous à votre compte Locasmart
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Champ email utilisant le composant Input */}
          <Input
            {...register('email')}
            type="email"
            label="Email"
            error={errors.email}
            showLabel={true}
          />

          {/* Champ mot de passe utilisant le composant Input */}
          <Input
            {...register('password')}
            type="password"
            label="Mot de passe"
            error={errors.password}
            showLabel={true}
          />

          {/* Lien "Mot de passe oublié" */}
          <Link href="/forget-password" className="block text-right">
            <p className="text-base text-gray-500 font-normal">
              Mot de passe oublié ?
            </p>
          </Link>

          {/* Bouton de soumission avec style dégradé */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-3 px-4 mt-8 bg-gradient-to-r from-[#165baa] to-[#707fff] text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Se connecter
          </button>
        </form>
      </div>

      {/* Section droite : image (masquée sur mobile) */}
      <div className="hidden lg:flex justify-center p-6 ml-16">
        <Image
          src="/images/connexion_page.png"
          alt="Illustration de connexion"
          width={570}
          height={570}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
