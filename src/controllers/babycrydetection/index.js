const FlaskHandler = require('./handler');

const register = async (server, options) => {
  server.decorate('server', 'flaskHandler', FlaskHandler);
};

module.exports = {
  name: 'babycrydetectionPlugin',
  register,
};
