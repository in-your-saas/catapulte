const nock = require('nock');
const sinon = require('sinon');
const {expect} = require('chai');

const controller = require('../source/controller/mail-send');
const mailer = require('../source/service/mailer');
const config = require('../source/config');

describe('controller mail send', () => {
  beforeEach(() => {
    this.scope = nock(config.get('jolimail').baseURL)
      .get('/api/templates/my-template-id/content')
      .reply(200, {
        title: 'hey <%= name %>!',
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
  beforeEach(() => {
    this.mailer = sinon.mock(mailer);
  });
  afterEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    this.mailer.restore();
  });

  it('should call mail-magic api', () => {
    const ch = {ack: sinon.fake()};
    const msg = {
      content: Buffer.from(JSON.stringify({
        template_id: 'my-template-id',
      })),
    };
    this.mailer.expects('sendMailAsync').once();
    return controller(ch)(msg)
      .then(() => {
        expect(this.scope.isDone()).to.eql(true);
        this.mailer.verify();
      });
  });
});
