const redis = require('redis');
const {promisify} = require('util');
const config = require('../config').get('redis');

class RedisService {
  constructor(options) {
    this.options = options;
    this.client = null;
  }

  connect() {
    if (this.client) return this;
    this.client = redis.createClient(this.options);
    this.get = promisify(this.client.get).bind(this.client);
    this.set = promisify(this.client.set).bind(this.client);
    return this;
  }

  get() {
    throw new Error('redis not connected');
  }

  set() {
    throw new Error('redis not connected');
  }
}

module.exports = new RedisService(config);

