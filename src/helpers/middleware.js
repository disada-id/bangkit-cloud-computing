/* eslint-disable consistent-return */
// src/helpers/middleware.js
module.exports = {
  requireSignIn: (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();

    if (!isAuthenticated) {
      return res
        .status(401)
        .send({ success: false, message: 'Authentication required' });
    }
    next();
  },
};
