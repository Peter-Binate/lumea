import { AuthResponse, LoginCredentials } from '@/types/auth';
import { httpClient } from '../api/httpClient';

class AuthService {
  private readonly BASE_PATH = 'account';
  private readonly LOGIN_END_POINT = 'admin/fake-auth/';
  /**
   * Authentifie un utilisateur avec ses credentials
   * @param credentials - Les identifiants de l'utilisateur
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const fullUrl = `${this.BASE_PATH}/${this.LOGIN_END_POINT}`;
      console.log('Tentative de connexion vers:', fullUrl);

      const response = await httpClient
        .post(fullUrl, {
          json: {
            email: credentials.email,
          },
          headers: {
            Accept: 'application/json',
          },
        })
        .json<AuthResponse>();

      console.log('Réponse brute:', response);

      if (!response) {
        throw new Error('Réponse vide du serveur');
      }

      sessionStorage.setItem('userEmail', credentials.email);
      return response;
    } catch (error) {
      console.error('Erreur finale détaillée:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
      });
      throw new Error(
        `Erreur de connexion: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /*
   * On vérifie si l'utilisateur a un email stocké en session
   */
  checkAuthStatus(): boolean {
    try {
      const userEmail = this.getUserEmail();
      return !!userEmail;
    } catch {
      return false;
    }
  }

  /**
   * On récupère les informations de l'utilisateur depuis le sessionStorage
   */
  getCurrentUser(): AuthResponse | null {
    try {
      const email = this.getUserEmail();
      return email ? { email } : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * On déconnecte l'utilisateur
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post(`${this.BASE_PATH}/logout/`).json();
      sessionStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw new Error('Échec de la déconnexion');
    }
  }

  /**
   * Méthode privée pour récupérer l'email de l'utilisateur depuis le sessionStorage
   */
  private getUserEmail(): string | null {
    return sessionStorage.getItem('userEmail');
  }
}

export const authService = new AuthService();
