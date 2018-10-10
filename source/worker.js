const controller = require('./controller/mail-send');
const mailer = require('./service/mailer');
const queue = require('./service/queue');

const listen = () => {
  return mailer.verify()
    .then(() => queue.getInstance().process(controller));
};

module.exports = {listen};
