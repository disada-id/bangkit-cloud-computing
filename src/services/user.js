/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const { User } = require('../models');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthenticationError = require('../exceptions/AuthenticationError');

class UserService {
  async signUp(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await this.verifyNewUserName(userData.username);
      await this.verifyNewUserEmail(userData.email);

      const newUser = await User.create({
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        fullname: userData.fullname,
        nohp: userData.nohp,
      });

      return {
        status: 'success',
        message: 'User signup successful',
        data: {
          user_id: newUser.user_id,
          email: newUser.email,
          username: newUser.username,
          fullname: newUser.fullname,
          nohp: newUser.nohp,
          created_at: newUser.created_at,
          updated_at: newUser.updated_at,
        },
        error: null,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields.includes('email')) {
          throw new InvariantError('Email already used', 'EMAIL_ALREADY_USED');
        }
        if (error.fields.includes('username')) {
          throw new InvariantError(
            'Username already used',
            'USERNAME_ALREADY_USED',
          );
        }
      }
      throw new InvariantError('Signup failed', 'SIGNUP_FAILED');
    }
  }

  async verifyNewUserName(username) {
    const result = await User.findOne({
      where: { username },
      attributes: ['user_id'],
    });
    if (result) {
      throw new InvariantError(
        'Username already used',
        'USERNAME_ALREADY_USED',
      );
    }
  }

  async verifyNewUserEmail(email) {
    const result = await User.findOne({
      where: { email },
      attributes: ['user_id'],
    });
    if (result) {
      throw new InvariantError('Email already used', 'EMAIL_ALREADY_USED');
    }
  }

  async signIn(email, password) {
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundError(
          `User with email ${email} not found`,
          'USER_NOT_FOUND',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Wrong credentials', 'WRONG_CREDENTIALS');
      }

      return {
        status: 'success',
        message: 'User signin successful',
        data: {
          user_id: user.user_id,
          email: user.email,
          username: user.username,
          fullname: user.fullname,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
        error: null,
      };
    } catch (error) {
      throw new InvariantError(
        'Internal Server Error',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}

module.exports = UserService;
