
const services = require('../services')
function logService(req, res, next) {
    //TODO: bitacorear para posterior cobro
    console.log('me debe 10');
    next();
}

module.exports = logService;