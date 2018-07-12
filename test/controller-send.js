// const {expect} = require('chai');
const supertest = require('supertest');

const request = supertest(require('../source/web'));

describe('controller send', () => {
  it('should return ok', () => {
    return request
      .post('/mails')
      .send({
        from: {
          email: 'jean@nowhe.re',
          name: 'Jean Nowhere',
        },
        template: '6422882a-2b72-418d-a744-d4c4523d4d77',
        recipients: [
          {
            to: {
              email: 'recipient@nowhe.re',
            },
            substitutions: {
              'FIRST_NAME': 'Recipient',
            },
          },
        ],
      })
      .expect(202);
  });
});
