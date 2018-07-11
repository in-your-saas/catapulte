module.exports = require('nconf')
  .env({
    lowerCase: true,
    parseValues: true,
    separator: '__',
  })
  .defaults({
    port: 3200,
    logger: 'tiny',
  });

