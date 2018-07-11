const express = require('express');

const app = express();

app.use(require('./middleware/logger'));

app.get('/', require('./controller/status'));

module.exports = app;
