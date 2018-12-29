const axios = require('axios');
const config = require('./config');

axios
  .get(`http://localhost:${config.get('port')}/`)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
