const redis = require('../source/service/redis');
const queue = require('../source/service/queue');

after(() => redis.client.end(true));
after(() => queue.close());
