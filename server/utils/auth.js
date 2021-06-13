const jwt = require('jsonwebtoken');

const secret = 'pugsrule';
const expiration = '2h';

module.exports = {
  // Use parameters for signing/creating the jwt. these can change based on what is used to login
  signToken: function ({ name, _id }) {
    const payload = { name, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function (req, res, next) {
    // allows token to be sent via req.body, req,query or headers
    let token = req.headers.authorization || req.body.token || req.query.token;

    // Seperate 'Bearer' from 'token'
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token, return request object as is
    if (!token) {
      return next();
    }

    try {
      // deconde and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token!');
    }

    // return the request object
    next();
  }
};
