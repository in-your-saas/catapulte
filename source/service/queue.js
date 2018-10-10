const Queue = require('bull');
const config = require('../config').get('redis');

class QueueService {
  constructor(options) {
    this.options = options;
    this.client = null;
  }

  getInstance() {
    if (!this.client) {
      this.client = new Queue('email', this.options.url);
    }
    return this.client;
  }
}

module.exports = new QueueService(config);

