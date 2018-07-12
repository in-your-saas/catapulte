const {expect} = require('chai');
const amqp = require('amqplib');
const sinon = require('sinon');

const Rabbit = require('../source/service/rabbit').Rabbit;

describe('service rabbit', () => {
  beforeEach(() => {
    this.rabbit = new Rabbit();
  });

  describe('getClient', () => {
    it('should create a connection', () => {
      const amqpMock = sinon.mock(amqp);
      amqpMock.expects('connect')
        .once()
        .returns(Promise.resolve('my connection'));
      expect(this.rabbit.client).to.be.null;
      return this.rabbit.getClient().then((client) => {
        amqpMock.verify();
        expect(client).to.eql('my connection');
        expect(this.rabbit.client).to.not.be.null;
        amqpMock.restore();
      });
    });

    it('should reuse an existing connection', () => {
      const amqpMock = sinon.mock(amqp);
      amqpMock.expects('connect').never();
      expect(this.rabbit.client).to.be.null;
      this.rabbit.client = Promise.resolve('connection');
      return this.rabbit.getClient().then((client) => {
        amqpMock.verify();
        expect(client).to.eql('connection');
        expect(this.rabbit.client).to.not.be.null;
        amqpMock.restore();
      });
    });
  });

  describe('getChannel', () => {
    beforeEach(() => {
      this.assertQueue = sinon.fake();
      this.channel = {
        assertQueue: this.assertQueue,
      };
      this.createChannel = sinon.fake.resolves(this.channel);
      this.rabbit.client = Promise.resolve({
        createChannel: this.createChannel,
      });
    });

    it('should create a channel', () => {
      return this.rabbit.getChannel().then((channel) => {
        expect(this.assertQueue.callCount).to.eql(1);
        expect(this.createChannel.callCount).to.eql(1);
        expect(channel).to.eql(this.channel);
        expect(this.rabbit.channel).to.not.be.null;
      });
    });
  });

  describe('send', () => {
    beforeEach(() => {
      this.sendToQueue = sinon.fake();
      this.rabbit.channel = Promise.resolve({
        sendToQueue: this.sendToQueue,
      });
    });

    it('should send the message', () => {
      const msg = {content: 'yolo'};
      const body = Buffer.from(JSON.stringify(msg));
      return this.rabbit.send(msg).then(() => {
        expect(this.sendToQueue.callCount).to.eql(1);
        expect(this.sendToQueue.calledWith('send-email', body)).to.be.true;
      });
    });
  });
});
