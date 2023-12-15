const routes = require('./routes');

const plugin = {
  name: 'user',
  register: async (server) => {
    server.route(routes);
  },
};
module.exports = plugin;
