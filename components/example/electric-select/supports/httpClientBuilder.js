import Http from '@core/Http';

export default function buildHttpClient({ headers = {} }) {
    return Http.getClient().headers(headers).disableLoading();
};