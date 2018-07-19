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
      url: process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost/mail-magic',
      queue: 'send-email',
    },
    mailer: {
      // use mailhog for testing
      host: 'smtp.example.com',
      port: 1025,
    },
    jolimail: {
      baseURL: 'http://localhost:3300',
      headers: {
        authorization: '',
        version: pck.version,
      },
    },
  });

