// src/app/auth/login/page.tsx
'use client';

// Imports des dépendances nécessaires
import Input from '@/app/components/ui/Input';
import { useAuth } from '@/app/contexts/AuthContext';
import { loginSchema, type LoginFormData } from '@/utils/validation/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  // États locaux pour gérer le chargement et les erreurs
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  //État isRedirecting pour éviter les redirections multiples
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Hooks pour l'authentification et la navigation
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Gestion de la redirection si déjà authentifié
  useEffect(() => {
    if (isAuthenticated && !isRedirecting) {
      setIsRedirecting(true);
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, isRedirecting]);

  // Configuration du formulaire avec react-hook-form et validation yup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  // Réinitialisation du formulaire en cas d'erreur
  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => {
        setGlobalError(null);
      }, 5000); // L'erreur disparaît après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [globalError]);

  // Gestionnaire de soumission du formulaire
  const onSubmit = async (data: LoginFormData) => {
    try {
      // Active l'état de chargement et réinitialise les erreurs
      setIsLoading(true);
      setGlobalError(null);

      //On vérifie que le formualire est valide
      if (!isValid) {
        setGlobalError('Email invalide');
        return;
      }

      console.log('Données de connexion:', data);

      // Tentative de connexion
      await login(data.email);
    } catch (error) {
      if (error instanceof Error && error.message === 'Already logged') {
        setGlobalError('Un utilisateur est déjà connecté');
      } else {
        setGlobalError('Email ou mot de passe incorrect');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Si une redirection est en cours, afficher un écran de chargement
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
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
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    // Container principal avec mise en page responsive
    <div className="border-2 border-red mt-10 max-w-screen-lg sm:max-w-full min-h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-center">
      {/* Section gauche : Formulaire de connexion */}
      <div className="flex-1 max-w-[584px]">
        {/* En-tête du formulaire */}
        <h2 className="text-4xl sm:text-5xl font-bold gap-5 mb-2 sm:mb-5">
          Content de vous revoir !
        </h2>
        <p className="mt-0 mb-12 text-md md:text-2xl lg:text-2xl">
          Connectez-vous à votre compte Locasmart
        </p>

        {/* Affichage des erreurs globales */}
        {globalError && (
          <div
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
            role="alert"
          >
            <p className="text-red-700">{globalError}</p>
          </div>
        )}

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Champ email avec validation */}
          <Input
            {...register('email')}
            type="email"
            label="Email"
            error={errors.email}
            showLabel={true}
            disabled={isLoading}
          />

          {/* Champ mot de passe avec validation */}
          {/*<Input
            {...register('password')}
            type="password"
            label="Mot de passe"
            error={errors.password}
            showLabel={true}
            disabled={isLoading}
          />

          {/* Lien vers la réinitialisation du mot de passe */}
          {/* <Link href="../password_reset" className="block text-right">
            <p className="text-base text-gray-500 font-normal">
              Mot de passe oublié ?
            </p>
          </Link> */}

          {/* Bouton de soumission avec état de chargement */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full py-3 px-4 mt-8 bg-gradient-to-r from-[#165baa] to-[#707fff] text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              // Affichage du spinner pendant le chargement
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

      {/* Section droite : Image décorative (masquée sur mobile) */}
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
}
