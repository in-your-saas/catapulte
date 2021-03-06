const mjml2html = require('mjml');
const isEmpty = require('lodash/isEmpty');
const template = require('lodash/template');
const debug = require('debug')('app:ctrl:mail-send');
const jolimail = require('../service/jolimail');
const templater = require('../service/templater');
const mailer = require('../service/mailer');
const redis = require('../service/redis');

const substitute = (value, substitutions) => {
  return template(value)(substitutions);
};

const convertMjml = (mjml, substitutions) => {
  const result = mjml2html(substitute(mjml, substitutions));
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

const loadAttachment = (attachment) => {
  return redis.get(attachment.cid)
    .then((content) => Object.assign({}, attachment, {content}));
};

const loadAttachments = (email, body) => {
  if (isEmpty(body.attachments)) {
    return email;
  }
  return Promise
    .all(body.attachments.map(loadAttachment))
    .then((attachments) => Object.assign({}, email, {attachments}));
};

const loadTemplates = (body) => {
  if (body.template_id) {
    return jolimail.getTemplate(body.template_id)
      .then((templates) => convertTemplates(templates, body.substitutions));
  }
  return templater.load(body.template_name, body.substitutions);
};

module.exports = (job) => {
  debug('send-email', job.data);
  const body = job.data;
  return Promise.resolve(body)
    .then(loadTemplates)
    .then((templates) => buildEmail(templates, body))
    .then((email) => loadAttachments(email, body))
    .then((email) => mailer.sendMailAsync(email))
    .then(debug)
    .catch(debug);
};
