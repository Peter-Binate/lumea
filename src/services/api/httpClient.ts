import ky from 'ky';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ErrorResponse {
  message?: string;
}

// Configuration du client Ky avec les options par défaut
export const httpClient = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: 'include', // Pour la gestion des cookies de session
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Récupérer le token depuis le sessionStorage
        const userEmail = sessionStorage.getItem('userEmail');

        // Ajouter les headers d'authentification si l'email existe
        if (userEmail) {
          request.headers.set('Authorization', `Bearer ${userEmail}`);
        }

        // Log pour le debug
        console.log('Headers de la requête:', {
          headers: Object.fromEntries(request.headers.entries()),
          url: request.url,
          method: request.method,
        });
      },
    ],
    afterResponse: [
      // Gestion des erreurs http
      async (request, options, response) => {
        // Log de la réponse
        console.log('Réponse du serveur:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        });
        console.log('Response Headers:', {
          'Access-Control-Allow-Origin': response.headers.get(
            'Access-Control-Allow-Origin'
          ),
          'Access-Control-Allow-Methods': response.headers.get(
            'Access-Control-Allow-Methods'
          ),
          'Access-Control-Allow-Headers': response.headers.get(
            'Access-Control-Allow-Headers'
          ),
          Origin: request.headers.get('Origin'),
        });

        if (!response.ok) {
          let errorMessage = 'Une erreur est survenue';
          try {
            const error = (await response.json()) as ErrorResponse;
            errorMessage = error.message || errorMessage;
          } catch (e) {
            console.error('Erreur parsing réponse:', e);
          }
          throw new Error(errorMessage);
        }
      },
    ],
  },
  retry: {
    limit: 0,
  },
});
