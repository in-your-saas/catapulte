const nock = require('nock');
const sinon = require('sinon');
const {expect} = require('chai');

const controller = require('../source/controller/mail-send');
const mailer = require('../source/service/mailer');
const config = require('../source/config');

describe('controller mail send', () => {
  beforeEach(() => {
    this.mailer = sinon.mock(mailer);
  });
  afterEach(() => {
    this.mailer.restore();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  describe('with good templates', () => {
    beforeEach(() => {
      this.scope = nock(config.get('jolimail').url)
        .get('/api/templates/my-template-id/content')
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
      const ch = {ack: sinon.fake()};
      const msg = {
        content: Buffer.from(JSON.stringify({
          from: 'sender@example.com',
          to: 'recipient@example.com',
          template_id: 'my-template-id',
          substitutions: {
            name: 'John',
          },
        })),
      };
      const spy = this.mailer.expects('sendMailAsync').once();
      return controller(ch)(msg)
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
          expect(ch.ack.callCount).to.eql(1);
          this.mailer.verify();
        });
    });
  });

  describe('with wrong templates', () => {
    beforeEach(() => {
      this.scope = nock(config.get('jolimail').url)
        .get('/api/templates/my-template-id/content')
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
      const ch = {ack: sinon.fake()};
      const msg = {
        content: Buffer.from(JSON.stringify({
          from: 'sender@example.com',
          to: 'recipient@example.com',
          template_id: 'my-template-id',
          substitutions: {
            name: 'John',
          },
        })),
      };
      this.mailer.expects('sendMailAsync').never();
      return controller(ch)(msg)
        .then(() => {
          expect(this.scope.isDone()).to.eql(true);
          expect(ch.ack.callCount).to.eql(1);
          this.mailer.verify();
        });
    });
  });
});
