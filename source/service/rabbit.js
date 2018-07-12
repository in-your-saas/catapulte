const amqp = require('amqplib');
const config = require('../config');

const {queue, url} = config.get('rabbit');

class Rabbit {
  constructor() {
    this.client = null;
    this.channel = null;
  }

  getClient() {
    if (!this.client) {
      this.client = amqp.connect(url);
    }
    return this.client;
  }

  getChannel() {
    if (!this.channel) {
      this.channel = this.getClient()
        .then((client) => client.createChannel())
        .then((ch) => {
          ch.assertQueue(queue, {durable: false});
          return ch;
        });
    }
    return this.channel;
  }

  send(message) {
    const body = Buffer.from(JSON.stringify(message));
    return this.getChannel()
      .then((ch) => ch.sendToQueue(queue, body));
  }
}

module.exports = new Rabbit();
module.exports.Rabbit = Rabbit;
