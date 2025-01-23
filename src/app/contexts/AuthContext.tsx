'use client';

import { authService } from '@/services/auth/authService';
import type { AuthResponse } from '@/types/auth';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<{ success: boolean }>;
  logout: () => Promise<{ success: boolean }>;
  user: AuthResponse | null;
}

// Création d'un contexte avec la valeur initiale null
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthResponse | null>(null);

  // Vérification de la session au chargement de la page
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // On vérifie si l'utilisateur est connecté
        const isAuth = authService.checkAuthStatus();
        setIsAuthenticated(isAuth);
        if (isAuth) {
          const userData = authService.getCurrentUser();
          setUser(userData);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Gestion de la connexion de l'utilisateur
  const login = async (email: string) => {
    try {
      // Ajout de logs pour le débogage
      console.log('Tentative de connexion avec:', email);
      // On appelle le service d'authentification pour se connecter
      const response = await authService.login({ email });
      console.log('Réponse du serveur:', response);
      // On met à jour l'état local après une connexion réussie
      setIsAuthenticated(true);
      setUser(response);

      // On retourne un objet indiquant le succès de la connexion
      return { success: true };
    } catch (error) {
      // Amélioration de la gestion des erreurs
      console.error('Erreur de connexion détaillée:', {
        message: error instanceof Error ? error.message : 'Erreur inconnue',
        error,
      });

      // Propagation de l'erreur avec plus d'informations
      throw new Error(
        `Échec de la connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      );
    }
  };

  // Gestion de la déconnexion de l'utilisateur
  const logout = async () => {
    try {
      // On appelle le service pour déconnecter l'utilisateur
      await authService.logout();
      // On réinitialise les états après déconnexion
      setIsAuthenticated(false);
      setUser(null);

      return { success: true };
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // Récupère le contexte AuthContext
  const context = useContext(AuthContext);
  // Si le contexte n'est pas disponible, lance une erreur
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Retourne le contexte (isAuthenticated, login, logout)
  return context;
}
