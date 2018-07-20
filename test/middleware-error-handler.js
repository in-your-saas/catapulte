const {expect} = require('chai');
const sinon = require('sinon');

const handler = require('../source/middleware/error-handler');

describe('middleware error handler', () => {
  it('should return 422', () => {
    const json = sinon.fake();
    const status = sinon.fake.returns({json});
    const res = {status};
    const err = new Error('validation error');
    err.isJoi = true;
    handler(err, null, res, null);
    expect(status.callCount).to.eql(1);
    expect(status.firstCall.lastArg).to.eql(422);
    expect(json.callCount).to.eql(1);
  });

  it('should return 500', () => {
    const json = sinon.fake();
    const status = sinon.fake.returns({json});
    const res = {status};
    handler(new Error('random error'), null, res, null);
    expect(status.callCount).to.eql(1);
    expect(status.firstCall.lastArg).to.eql(500);
    expect(json.callCount).to.eql(1);
  });
});
