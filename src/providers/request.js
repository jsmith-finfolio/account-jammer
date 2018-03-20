// Unfortunately calling defaults requires that the entire request lib has been loaded
var requestLib = require('request');

const request = requestLib.defaults({
    jar: true
});

export default request;