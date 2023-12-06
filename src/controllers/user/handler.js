const UserService = require('../../services/user');

const userService = new UserService();

const userHandler = {
  signUp: async (request, h) => {
    try {
      const userData = request.payload;
      const result = await userService.signUp(userData);
      return h.response(result).code(201);
    } catch (error) {
      return h
        .response({
          status: 'Bad Request',
          message: error.message,
          data: null,
          error: {
            code: 'BAD_REQUEST',
          },
        })
        .code(400);
    }
  },

  signIn: async (request, h) => {
    try {
      const { email, password } = request.payload;
      const result = await userService.signIn(email, password);
      return h.response(result).code(200);
    } catch (error) {
      return h
        .response({
          status: 'Unauthorized',
          message: error.message,
          data: null,
          error: {
            code: 'UNAUTHORIZED',
          },
        })
        .code(401);
    }
  },
};

module.exports = userHandler;
