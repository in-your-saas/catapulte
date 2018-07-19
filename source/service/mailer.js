const {promisify} = require('util');
const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport(config.get('mailer'));

transporter.sendMailAsync = promisify(transporter.sendMail).bind(transporter);

module.exports = transporter;
