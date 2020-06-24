import Http from '@core/http';

const httpClient = Http.getClient();
httpClient.on('error', function() {});

export default class LogRecorder {
    constructor({ saveUrl }) {
        this.saveUrl = saveUrl;
    }

    save(data) {
        httpClient.post(this.saveUrl, data);
    }
}
