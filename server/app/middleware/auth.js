const { User } = require('../models/UserModel');
const auth = (req, res, next) => {
  let token = req.headers.authtoken;
  User.findByToken(token, async (err, user) => {
    try {
      if (!user) return res.json({ isAuth: false, error: true });
      req.token = token;
      req.user = user;
      next();
    } catch(err) {
      throw err;
    }
  });
}
module.exports = { auth }