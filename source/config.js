module.exports = require('nconf')
  .env({
    lowerCase: true,
    parseValues: true,
    separator: '__',
  })
  .defaults({
    port: 3200,
    logger: 'tiny',
    rabbit: {
      url: 'amqp://guest:guest@localhost/mail-magic',
      queue: 'send-email',
    },
  });

