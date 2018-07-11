const {expect} = require('chai');
const supertest = require('supertest');

const request = supertest(require('../source/web'));

describe('controller status', () => {
  it('should return ok', () => {
    return request.get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('ok', true);
      });
  });
});
