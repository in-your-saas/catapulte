const ejs = require('ejs');
const mjml2html = require('mjml');
const path = require('path');
const config = require('../config').get('template');

const renderFile = (filename, data) => new Promise((resolve, reject) => {
  ejs.renderFile(path.join(config.path, filename), data, (err, value) => {
    if (err) return reject(err);
    return resolve(value);
  });
});

const load = (templateName, data) =>
  Promise.all([
    renderFile(`${templateName}/subject.ejs`, data),
    renderFile(`${templateName}/mjml.ejs`, data),
    renderFile(`${templateName}/text.ejs`, data),
  ]).then(([subject, mjml, text]) => ({
    subject,
    html: mjml2html(mjml).html,
    text,
  }));

module.exports = {
  load,
};
