const {expect} = require('chai');
const sinon = require('sinon');
const path = require('path');
const supertest = require('supertest');

const redis = require('../source/service/redis');
const request = supertest(require('../source/web'));

describe('controller attachment create', () => {
  beforeEach(() => {
    this.redis = sinon.mock(redis);
  });
  afterEach(() => {
    this.redis.restore();
  });

  it('should return a uuid', () => {
    this.redis.expects('set').once().returns(Promise.resolve());
    return request
      .post('/attachments')
      .attach('content', path.join(__dirname, 'data/image.png'))
      .expect(200)
      .expect((res) => {
        this.redis.verify();
        expect(res.body).to.have.property('cid');
        expect(res.body).to.have.property('mimetype');
        expect(res.body).to.have.property('originalname');
        expect(res.body).to.have.property('size');
      });
  });

  it('should throw a 422', () => {
    this.redis.expects('set').once().returns(Promise.resolve());
    return request
      .post('/attachments')
      .attach('contents', path.join(__dirname, 'data/image.png'))
      .expect(422);
  });
});
