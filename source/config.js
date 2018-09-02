const pck = require('../package.json');

module.exports = require('nconf')
  .env({
    parseValues: true,
    separator: '_',
  })
  .defaults({
    PORT: 3200,
    logger: 'tiny',
    rabbit: {
      url: process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost/catapulte',
      queue: 'send-email',
    },
    redis: {
      url: 'redis://localhost',
      // 30 min before removing from the cache
      expiration: 60 * 30,
    },
    mailer: {
      // use mailhog for testing
      host: 'smtp.example.com',
      port: 1025,
    },
    jolimail: {
      url: 'https://api.jolimail.io',
      token: '',
      version: pck.version,
    },
  });

