const nock = require('nock');
const sinon = require('sinon');
const {expect} = require('chai');

const controller = require('../source/controller/mail-send');
const mailer = require('../source/service/mailer');
const redis = require('../source/service/redis');
const config = require('../source/config');

describe('controller mail send', () => {
  beforeEach(() => {
    this.mailer = sinon.mock(mailer);
    this.redis = sinon.mock(redis);
  });
  afterEach(() => {
    this.mailer.restore();
    this.redis.restore();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  describe('with remote templates', () => {
    describe('with good templates', () => {
      beforeEach(() => {
        this.scope = nock(config.get('jolimail').url)
          .get('/api/templates/my-template-id/render')
          .reply(200, {
            subject: 'hey <%= name %>!',
            text: `
            Hello <%= name %>!
            How are you?!
            `,
            mjml: `
            <mjml>
            </mjml>
            `,
          });
      });
      it('should call mail-magic api', () => {
        const job = {
          data: {
            from: 'sender@example.com',
            to: 'recipient@example.com',
            template_id: 'my-template-id',
            substitutions: {
              name: 'John',
            },
          },
        };
        const spy = this.mailer.expects('sendMailAsync').once();
        return controller(job)
          .then(() => {
            expect(this.scope.isDone()).to.eql(true);
            expect(spy.firstCall.lastArg).to.have
              .property('from', 'sender@example.com');
            expect(spy.firstCall.lastArg).to.have
              .property('to', 'recipient@example.com');
            expect(spy.firstCall.lastArg).to.have
              .property('subject', 'hey John!');
            expect(spy.firstCall.lastArg).to.have.property('text', `
            Hello John!
            How are you?!
            `);
            expect(spy.firstCall.lastArg).to.have
              .property('html').to.contain('<!doctype html>');
            this.mailer.verify();
          });
      });

      it('should load attachments', () => {
        const job = {
          data: {
            from: 'sender@example.com',
            to: 'recipient@example.com',
            template_id: 'my-template-id',
            substitutions: {
              name: 'John',
            },
            attachments: [{
              cid: 'random-uuid',
              filename: 'image.png',
            }],
          },
        };
        this.mailer.expects('sendMailAsync').once();
        const spy = this.redis.expects('get').once()
          .returns(Promise.resolve(Buffer.from('oh-yeah!')));
        return controller(job)
          .then(() => {
            expect(this.scope.isDone()).to.eql(true);
            expect(spy.firstCall.args[0]).to.eql('random-uuid');
            this.mailer.verify();
            this.redis.verify();
          });
      });
    });

    describe('with wrong templates', () => {
      beforeEach(() => {
        this.scope = nock(config.get('jolimail').url)
          .get('/api/templates/my-template-id/render')
          .reply(200, {
            subject: 'hey <%= name %>!',
            text: `
            Hello <%= name %>!
            How are you?!
            `,
            mjml: `
            <mjml
            `,
          });
      });
      it('should call mail-magic api', () => {
        const job = {
          data: {
            from: 'sender@example.com',
            to: 'recipient@example.com',
            template_id: 'my-template-id',
            substitutions: {
              name: 'John',
            },
          },
        };
        this.mailer.expects('sendMailAsync').never();
        return controller(job).catch(() => {
          expect(this.scope.isDone()).to.eql(true);
          this.mailer.verify();
        });
      });
    });
  });

  describe('with local templates', () => {
    it('should generate the html', () => {
      const job = {
        data: {
          from: 'sender@example.com',
          to: 'recipient@example.com',
          template_name: 'login',
          substitutions: {
            name: 'John',
          },
        },
      };
      this.mailer.expects('sendMailAsync').never();
      return controller(job).catch(() => {
        expect(this.scope.isDone()).to.eql(true);
        this.mailer.verify();
      });
    });
  });
});
