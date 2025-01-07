// Représentation des données pour une requête de connexion
export interface LoginFormData {
  email: string;
  password: string;
}

// Représentation des données pour une requête d'inscription
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  rentalsNumber: [];
  additionalRentals: number;
  //subscriptionType: '';
}

// Réponse d'authentification (API)
export interface AuthResponse {
  token: string;
  user: User; // Objet utilisateur (défini dans user.d.ts)
}

// Définition des types pour la récupération du mot de passe
export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  newPassword: string;
}

// État d'authentification dans le contexte global
export interface AuthState {
  isAuthenticated: boolean; // Indique si l'utilisateur est connecté
  token?: string; // Jeton JWT si connecté
  user?: User; // Détails de l'utilisateur connecté
}
