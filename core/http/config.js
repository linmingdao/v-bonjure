export const defaultReqHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'mode': 'cors',
    'credentials': 'include'
};

export const defaultOption = {
    showLoading: true,
    useInterceptor: true,
    locked: false,
    reqheader: {
        ...defaultReqHeader
    },
    onbefore: null,
    oncomplete: null,
    onsuccess: null,
    onerror: null
};