const Queue = require('bull');
const config = require('../config').get('redis');

module.exports = new Queue('email', config.url);
