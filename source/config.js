const pck = require('../package.json');

module.exports = require('nconf')
  .env({
    lowerCase: true,
    parseValues: true,
    separator: '_',
  })
  .defaults({
    port: 3200,
    logger: 'tiny',
    rabbit: {
      url: 'amqp://guest:guest@localhost/mail-magic',
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

