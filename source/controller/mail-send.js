const mjml2html = require('mjml');
const template = require('lodash/template');
const debug = require('debug')('app:ctrl:mail-send');
const jolimail = require('../service/jolimail');
const mailer = require('../service/mailer');

const substitute = (value, substitutions, defaultValue = '') => {
  if (!value) return defaultValue;
  return template(value)(substitutions);
};

const convertMjml = (mjml, substitutions) => {
  const result = mjml2html(substitute(mjml, substitutions));
  if (result.errors.length) {
    throw result.errors[0];
  }
  return result.html;
};

const convertTemplates = (templates, substitutions) => {
  const subject = substitute(templates.subject, substitutions);
  const text = substitute(templates.text, substitutions);
  const html = convertMjml(templates.mjml, substitutions);
  return {subject, text, html};
};

const buildEmail = (templates, body) => ({
  from: body.from,
  to: body.to,
  subject: templates.subject,
  text: templates.text,
  html: templates.html,
});

module.exports = (ch) => (msg) => {
  const body = JSON.parse(msg.content.toString());
  return jolimail
    .getTemplate(body.template_id)
    .then((templates) => convertTemplates(templates, body.substitutions))
    .then((templates) => buildEmail(templates, body))
    .then((result) => mailer.sendMailAsync(result))
    .then(debug)
    .catch(debug)
    .then(() => ch.ack(msg));
};
