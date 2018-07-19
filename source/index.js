/* eslint-disable no-console */

const startWeb = () => new Promise((resolve, reject) => {
  const web = require('./web');
  const config = require('./config');

  web.listen(config.get('port'), (err) => {
    if (err) return reject(err);
    return resolve(`web listening on port ${config.get('port')}`);
  });
});

const startWorker = () => {
  const worker = require('./worker');
  return worker.listen().then(() => 'worker listening');
};

const start = (cmd) => {
  if (cmd === 'web') return startWeb();
  if (cmd === 'worker') return startWorker();
  return Promise.reject(new Error('invalid command'));
};

const command = process.argv.length > 2 ? process.argv[2] : 'web';

start(command)
  .then(console.log)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
