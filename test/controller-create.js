const {expect} = require('chai');
const supertest = require('supertest');
const uuidv4 = require('uuid/v4');

const helper = require('./helper');
const request = supertest(require('../source/web'));

describe('controller mail create', () => {
  beforeEach(() => {
    this.queue = helper.queue.mock();
  });
  afterEach(() => {
    this.queue.restore();
  });

  it('should return ok', () => {
    this.queueInstance = helper.queue.fakeInstance();
    this.queue.expects('getInstance')
      .once()
      .returns(this.queueInstance);
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
        expect(this.queueInstance.add.callCount).to.eql(1);
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
      this.queueInstance = helper.queue.fakeInstance();
      this.queue.expects('getInstance')
        .once()
        .returns(this.queueInstance);
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
          expect(this.queueInstance.add.callCount).to.eql(1);
        });
    });
  });
});
