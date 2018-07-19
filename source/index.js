/* eslint-disable no-console */

const startWeb = (cmd) => {
  if (!['web', 'all'].includes(cmd)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const web = require('./web');
    const config = require('./config');

    web.listen(config.get('port'), (err) => {
      if (err) return reject(err);
      console.log(`web listening on port ${config.get('port')}`);
      return resolve();
    });
  });
};

const startWorker = (cmd) => {
  if (!['worker', 'all'].includes(cmd)) {
    return Promise.resolve();
  }
  const worker = require('./worker');
  return worker.listen().then(() => console.log('worker listening'));
};

const start = (cmd) => {
  return Promise.all([
    startWeb(cmd),
    startWorker(cmd),
  ]);
};

const command = process.argv.length > 2 ? process.argv[2] : 'all';

start(command)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
