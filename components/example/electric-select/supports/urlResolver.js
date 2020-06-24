export function resolveUrl(url, queryParams) {
    let queryArr = [];
    for (let key in queryParams) {
        typeof queryParams[key] !== 'undefined' && queryArr.push(`${key}=${queryParams[key]}`);
    }
    let queryString = '';
    queryArr.length && (queryString = queryArr.join('&'));
    return url.indexOf('?') > -1 ? `${url}&${queryString}` : `${url}?${queryString}`;
}
