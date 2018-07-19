const config = require('./config');
const controller = require('./controller/mail-send');
const mailer = require('./service/mailer');
const rabbit = require('./service/rabbit');

const listen = () => {
  return mailer.verify()
    .then(() => rabbit.getChannel())
    .then((ch) => {
      ch.consume(config.get('rabbit').queue, controller(ch));
    });
};

module.exports = {listen};
