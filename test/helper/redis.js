const sinon = require('sinon');
const redis = require('../../source/service/redis');

const mock = () => sinon.mock(redis);

module.exports = {
  mock,
};
