import Http from '@core/http';

export default function buildHttpClient({ headers = {} }) {
    return Http.getClient()
        .headers(headers)
        .disableLoading();
}
