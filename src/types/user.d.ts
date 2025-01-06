// Représentation des données utilisateur
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

// Définition des rôles utilisateur
export type UserRole = 'user' | 'admin';

// Représentation des préférences utilisateur
export interface UserPreferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
}

// Représentation du profil utilisateur
export interface UserProfile extends User {
  preferences: UserPreferences;
}
