const morgan = require('morgan');
const config = require('../config');

module.exports = morgan(config.get('logger'));
