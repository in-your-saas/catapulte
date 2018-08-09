const redis = require('../source/service/redis');

after(() => redis.client.end(true));
