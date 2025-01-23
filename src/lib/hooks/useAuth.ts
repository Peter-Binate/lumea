import { authService } from '@/services/auth/authService';
import type { AuthResponse } from '@/types/auth';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Vérifie le statut d'authentification au montage du composant
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const isAuth = authService.checkAuthStatus();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const userData = authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      setError('Erreur lors de la vérification du statut');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string) => {
    try {
      setError(null);
      const response = await authService.login({ email });
      setUser(response);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur de connexion');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Erreur de déconnexion'
      );
      throw error;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    user,
    error,
  };
}
