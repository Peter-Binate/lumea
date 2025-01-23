// Représentation des données pour une requête de connexion
export interface LoginFormData {
  email: string;
  password: string;
}

// Données d'entrée nécessaires pour effectuer une connexion
export interface LoginCredentials {
  email: string;
}

// Réponse de l'api lors de la connexion
export interface AuthResponse {
  email: string;
}

export interface AuthError {
  error: string;
}

// Représentation des données pour une requête d'inscription
// export interface RegisterFormData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   rentalsNumber: number;
//   //subscriptionType: '';
// }

// // Définition des types pour la récupération du mot de passe
// export interface ForgotPasswordFormData {
//   email: string;
// }

// export interface ResetPasswordFormData {
//   token: string;
//   newPassword: string;
// }
