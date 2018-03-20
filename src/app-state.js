import createStore from 'unistore';

let appState = createStore({
    username: '',
    host: '',
    accountDataFilePath: '',
    authorization: null
});

export default appState;