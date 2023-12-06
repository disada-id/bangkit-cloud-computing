const routes = require('./routes');

const plugin = {
  name: 'babycrydetection',
  register: async (server, options) => {
    server.route(routes);
  },
};

module.exports = plugin;
