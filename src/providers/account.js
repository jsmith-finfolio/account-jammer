import { prompt } from 'inquirer';
import request from './request';
import { join } from 'path';
import { parseAccountData } from './file';
import { tryGetPortal, tryGetFolio } from './folio';
import appState from '../app-state';

const loginPrompts = [{
    name: 'username',
    message: 'Username: ',
    default: 'admin@example.com'
}, {
    name: 'password',
    message: 'Password: ',
    type: 'password',
    default: '$Ss#QC2hTug3hj%'
}, {
    name: 'host',
    message: 'Environment: ',
    default: 'devlatest.finfolio.com'
}];


const login = () => new Promise((resolve, reject) => {
    prompt(loginPrompts)
        .then(({ username, password, host }) => {
            request(`https://${host}/api/login`, {
                method: 'POST',
                formData: {
                    username,
                    password,
                    grant_type: 'password'
                },
            }, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    appState.setState({
                        username,
                        host,
                        authorization: res.headers.authorization
                    });
                    resolve();
                }
            });
        });
});

const createAccounts = () => new Promise((resolve, reject) => {
    parseAccountData()
        .then(data => {
            data.forEach(({ fullName, email, portal, rows }) => {
                if (portal && portal.length > 0) {
                    tryGetPortal(portal);
                }
            })
        })
        .catch(e => reject(e));
});


export {
    login,
    createAccounts
}