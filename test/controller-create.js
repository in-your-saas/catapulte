// const {expect} = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');

const rabbit = require('../source/service/rabbit');
const request = supertest(require('../source/web'));

describe('controller mail create', () => {
  beforeEach(() => {
    this.rabbit = sinon.mock(rabbit);
  });
  afterEach(() => {
    this.rabbit.restore();
  });

  it('should return ok', () => {
    this.rabbit.expects('send').once().returns(Promise.resolve());
    return request
      .post('/mails')
      .send({
        from: 'jean@nowhe.re',
        to: 'recipient@nowhe.re',
        template: '6422882a-2b72-418d-a744-d4c4523d4d77',
        substitutions: {
          'FIRST_NAME': 'Recipient',
        },
      })
      .expect(202)
      .expect(() => {
        this.rabbit.verify();
      });
  });
});
