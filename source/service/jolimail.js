const axios = require('axios');
const config = require('../config').get('jolimail');

const client = axios.create({
  baseURL: config.url,
  headers: {
    authorization: config.token,
    version: config.version,
  },
});

const getTemplate = (templateId) => client
  .get(`/api/templates/${templateId}/content`)
  .then((res) => res.data);

module.exports = {
  client,
  getTemplate,
};
