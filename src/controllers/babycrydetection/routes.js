const handler = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/predict/recommendation',
    handler: handler.handleNodeJsEndpoint,
  },
];

module.exports = routes;
