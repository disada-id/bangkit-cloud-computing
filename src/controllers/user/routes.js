const userHandler = require('./handler');

const userRoutes = [
  {
    method: 'POST',
    path: '/auth/signup',
    handler: userHandler.signUp,
  },
  {
    method: 'POST',
    path: '/auth/signin',
    handler: userHandler.signIn,
  },
];

module.exports = userRoutes;
