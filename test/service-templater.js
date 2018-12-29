const {expect} = require('chai');

const templater = require('../source/service/templater');

describe('service templater', () => {
  it('should read the login template', () => {
    return templater
      .load('login', {name: 'coucou'})
      .then((result) => {
        expect(result).to.have.property('subject');
        expect(result).to.have.property('html');
        expect(result).to.have.property('text');
        expect(result.subject).to.contain('Hello coucou');
        expect(result.html).to.contain('Hello coucou');
        expect(result.text).to.contain('Hello coucou');
      });
  });
});
