const Client = require('./ClientError');

class NotFoundError extends Client {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
