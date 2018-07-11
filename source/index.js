/* eslint-disable no-console */
const web = require('./web');
const config = require('./config');

web.listen(config.get('port'), (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('listen on port', config.get('port'));
});
