import Http from '@core/http';

export const httpClient = Http.getClient();

export const httpClientForDocument = Http.getClient().headers(
    {
        'Content-Type': 'text/plain'
    },
    true,
    true
);
