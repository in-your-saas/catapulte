// const {expect} = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const uuidv4 = require('uuid/v4');

const queue = require('../source/service/queue');
const redis = require('../source/service/redis');
const request = supertest(require('../source/web'));

describe('controller mail create', () => {
  beforeEach(() => {
    this.queue = sinon.mock(queue);
    this.redis = sinon.mock(redis);
  });
  afterEach(() => {
    this.queue.restore();
    this.redis.restore();
  });

  it('should return ok', () => {
    this.queue.expects('add').once().returns(Promise.resolve());
    return request
      .post('/mails')
      .send({
        from: 'jean@nowhe.re',
        to: 'recipient@nowhe.re',
        template_id: '6422882a-2b72-418d-a744-d4c4523d4d77',
        substitutions: {
          'FIRST_NAME': 'Recipient',
        },
      })
      .expect(202)
      .expect(() => {
        this.queue.verify();
      });
  });

  it('should throw an error', () => {
    return request
      .post('/mails')
      .send({
        from: 'jean@nowhe.re',
        to: 'recipient@nowhe.re',
        template_id: '2b72-418d-a744-d4c4523d4d77',
        substitutions: {
          'FIRST_NAME': 'Recipient',
        },
      })
      .expect(422);
  });

  describe('attachment', () => {
    it('should accept files', () => {
      const cid = uuidv4();
      this.queue.expects('add').once().returns(Promise.resolve());
      return request
        .post('/mails')
        .send({
          from: 'jean@nowhe.re',
          to: 'recipient@nowhe.re',
          template_id: '6422882a-2b72-418d-a744-d4c4523d4d77',
          substitutions: {
            'FIRST_NAME': 'Recipient',
          },
          attachments: [
            {cid, filename: 'image.png'},
          ],
        })
        .expect(202)
        .expect(() => {
          this.queue.verify();
        });
    });
  });
});
