const Hapi = require('@hapi/hapi');
const sequelize = require('./helpers/database');
const ClientError = require('./exceptions/ClientError');
const AuthenticationError = require('./exceptions/AuthenticationError');

const usersPlugin = require('./controllers/user');
const babycryPlugin = require('./controllers/babycrydetection');

(async () => {
  const date = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
  });
  const currentHour = date.slice(10, 17);

  const server = Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Register plugins
  await server.register([usersPlugin, babycryPlugin]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    // if response ClientError
    if (response instanceof ClientError) {
      const responseData = response.data || {};

      if (response instanceof AuthenticationError) {
        // 401
        return h
          .response({
            status: 'Unauthorized',
            message: response.message,
            data: responseData,
          })
          .code(response.statusCode); // 401
      }

      // 400
      return h
        .response({
          status: 'Bad Request',
          message: response.message,
          data: responseData,
        })
        .code(response.statusCode); // 400
    }

    if (response.isServer) {
      console.log(`Error: ${response.message}`);
      return h
        .response({
          status: 'Server Error',
          message: response.message,
          data: {},
        })
        .code(500); // 500
    }
    return response.continue || response;
  });

  server.events.on('response', (request) => {
    console.log(
      `${currentHour} | ${request.response.statusCode} | ${
        request.info.remoteAddress
      } : ${request.method.toUpperCase()} ${request.path}`,
    );
  });

  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
