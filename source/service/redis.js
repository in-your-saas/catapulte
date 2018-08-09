const redis = require('redis');
const {promisify} = require('util');
const config = require('../config').get('redis');

const client = redis.createClient(config);

module.exports = {
  client,
  expiration: config.expiration,
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
};
