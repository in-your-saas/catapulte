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
      pool: false,
      host: 'smtp.example.com',
      port: 465,
      auth: {
        user: 'username',
        pass: 'pass',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    },
    jolimail: {
      baseURL: 'http://localhost:3300',
      headers: {
        authorization: '',
        version: pck.version,
      },
    },
  });

