const routes = require('./routes');

const plugin = {
  name: 'users',
  register: async (server, options) => {
    server.route(routes);
  },
};

module.exports = plugin;
