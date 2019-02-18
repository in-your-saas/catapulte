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
    template: {
      path: 'sample',
    },
    jolimail: {
      url: 'https://app.jolimail.io',
      token: '',
      version: pck.version,
    },
  });

