const axios = require('axios');
const config = require('../config');

const client = axios.create(config.get('jolimail'));

const getTemplate = (templateId) => client
  .get(`/api/templates/${templateId}/content`)
  .then((res) => res.data);

module.exports = {
  client,
  getTemplate,
};
