const {expect} = require('chai');
const sinon = require('sinon');
const Redis = require('redis');
const redis = require('../source/service/redis');

describe('service redis', () => {
  describe('before connect', () => {
    it('should not connect auto', () => {
      expect(redis.client).to.eql(null);
    });

    it('should not have get', () => {
      expect(redis.get).to.throw();
    });

    it('should not have set', () => {
      expect(redis.set).to.throw();
    });
  });

  describe('connect', () => {
    beforeEach(() => {
      this.redis = sinon.mock(Redis);
    });

    afterEach(() => {
      this.redis.restore();
    });

    it('should create client', () => {
      this.redis.expects('createClient').once().returns({
        get: sinon.spy(),
        set: sinon.spy(),
      });
      redis.connect();
      redis.connect();
      this.redis.verify();
      expect(redis.get).to.not.throw();
      expect(redis.set).to.not.throw();
    });
  });
});
