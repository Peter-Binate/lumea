'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

// Création d'un contexte avec la valeur initiale null
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation d'une vérification de session au chargement de la page
  useEffect(() => {
    // A remplacer plus tard par une vraie vérification de session Django
    const checkAuth = async () => {
      try {
        // On vérifie si l'utilisateur est connecté
        const fakeSession = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(fakeSession === 'true');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string) => {
    // Simulation de login - à remplacer par l'appel API Django
    try {
      // Simulation d'une requête réussie
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } catch (error) {
      // Simulation d'une erreur
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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
