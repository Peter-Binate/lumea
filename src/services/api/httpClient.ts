import ky from 'ky';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

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
        // Ajout des headers par défaut
        request.headers.set('Content-Type', 'application/json');
        // Log complet de la requête avec l'URL absolue
        const fullUrl = new URL(request.url, API_BASE_URL);
        console.log('Requête complète:', {
          fullUrl: fullUrl.toString(),
          method: request.method,
          headers: Object.fromEntries(request.headers.entries()),
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
