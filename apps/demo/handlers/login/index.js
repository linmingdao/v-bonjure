import * as localStorageHelper from '../../utils/localStorageHelper';

export const handleRemeberMe = ({ token, remeber, username, password }) => new Promise((resolve, reject) => {
    if (remeber) {
        localStorageHelper.set('remeber', true);
        localStorageHelper.set('username', username);
        localStorageHelper.set('password', password);
    } else {
        localStorageHelper.set('remeber', false);
        localStorageHelper.remove('username');
        localStorageHelper.remove('password');
    }
    localStorageHelper.set('token', token);
    resolve();
});

export const askRemeberMe = () => new Promise((resolve, reject) => {
    if (localStorageHelper.get('remeber') === 'true') {
        const username = localStorageHelper.get('username');
        const password = localStorageHelper.get('password');
        resolve({
            remeber: true,
            username,
            password
        });
    } else {
        resolve({
            remeber: false
        });
    }
});