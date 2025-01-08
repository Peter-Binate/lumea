'use client';

import Input from '@/app/components/ui/Input';
import { LoginFormData } from '@/types/auth';
import { loginSchema } from '@/utils/validation/auth/login.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  // États et hooks
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setGlobalError(null);

      //On vérifie que le formualire est valide
      if (!isValid) {
        setGlobalError('email ou mot de passe invalide');
        return;
      }

      // TODO: Appel à l'API qui sera implémenté plus tard
      // Cette partie sera déplacée dans un service d'authentification
      console.log('Données de connexion:', data);

      // Simulation d'une attente pour démonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        data.email !== 'test@example.com' ||
        data.password !== 'password123'
      ) {
        setGlobalError('Email ou mot de passe incorrect');
        return;
      }

      // Redirection après connexion réussie
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setGlobalError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
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

        {globalError && (
          <div
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
            role="alert"
          >
            <p className="text-red-700">{globalError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Champ email utilisant le composant Input */}
          <Input
            {...register('email')}
            type="email"
            label="Email"
            error={errors.email}
            showLabel={true}
            disabled={isLoading}
          />

          {/* Champ mot de passe utilisant le composant Input */}
          <Input
            {...register('password')}
            type="password"
            label="Mot de passe"
            error={errors.password}
            showLabel={true}
            disabled={isLoading}
          />

          {/* Lien "Mot de passe oublié" */}
          <Link href="password_reset" className="block text-right">
            <p className="text-base text-gray-500 font-normal">
              Mot de passe oublié ?
            </p>
          </Link>

          {/* Bouton de soumission avec style dégradé */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full py-3 px-4 mt-8 bg-gradient-to-r from-[#165baa] to-[#707fff] text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="mr-4">Connexion en cours...</span>
              </>
            ) : (
              'Se connecter'
            )}
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
