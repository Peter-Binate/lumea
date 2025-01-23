import ky from 'ky';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Configuration du client Ky avec les options par défaut
export const httpClient = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: 'include', // Pour la gestion des cookies de session
  hooks: {
    beforeRequest: [
      (request) => {
        // Ajout des headers par défaut
        request.headers.set('Content-Type', 'application/json');
      },
    ],
    afterResponse: [
      // Gestion des erreurs http
      async (request, options, response) => {
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));

          // On vérifie si "error" a un champ "message"
          const message =
            typeof error === 'object' && error !== null && 'message' in error
              ? (error as { message: string }).message
              : 'Une erreur est survenue';

          throw new Error(message);
        }
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ['get', 'post'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 30000,
});
