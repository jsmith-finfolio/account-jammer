import request from './request';
import appState from '../app-state';

const tryGetPortal = portal => new Promise((resolve, reject) => {
    const { host, authorization } = appState.getState();
    request(`https://${host}/api/dashboard/portal`, {
        method: 'GET',
        headers: {
            authorization
        }
    },
        (err, response) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(JSON.parse(response.body));
            }
        });
})

const tryGetFolio = folio => new Promise((resolve, reject) => { })

export {
    tryGetFolio,
    tryGetPortal
}