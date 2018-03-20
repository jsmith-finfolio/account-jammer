import { login, createAccounts } from './providers/account';

function start() {
    console.log();
    console.log();
    console.log('----------------------')
    console.log('|   ACCOUNT JAMMER   |');
    console.log('|     Dev: Jeff      |');
    console.log('|   Version: 0.0.1   |');
    console.log('----------------------')
    console.log();

    // Starts the process
    login()
        .then(p => {
            console.log();
            console.log('Login completed successfully')
            console.log();
            return createAccounts(p);
        })
        .then(d => console.log(d))
        .catch(e => console.error(e));
}

start();