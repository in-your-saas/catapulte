const express = require('express');

const app = express();

app.use(require('body-parser').json());
app.use(require('./middleware/logger'));

app.get('/', require('./controller/status'));
app.post('/mails', require('./controller/mail-create'));

app.use(require('./middleware/error-handler'));

module.exports = app;
