const sinon = require('sinon');
const queue = require('../../source/service/queue');

const mock = () => sinon.mock(queue);

const fakeInstance = () => ({
  add: sinon.fake.resolves(),
});

module.exports = {
  fakeInstance,
  mock,
};
