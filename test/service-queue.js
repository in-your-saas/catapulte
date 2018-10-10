const {expect} = require('chai');
const proxyquire = require('proxyquire');

class FakeQueue {
  constructor() {
    this.calledOnce = true;
  }
}

describe('service queue', () => {
  beforeEach(() => {
    this.queue = proxyquire('../source/service/queue', {
      bull: FakeQueue,
    });
  });

  it('should create an instance', () => {
    const result = this.queue.getInstance();
    expect(result).instanceof(FakeQueue);
    expect(result.calledOnce).to.eql(true);
  });
  it('should create only one instance', () => {
    const first = this.queue.getInstance();
    const second = this.queue.getInstance();
    expect(first).to.eql(second);
  });
});
