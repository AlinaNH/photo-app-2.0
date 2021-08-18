const { User } = require('../models/UserModel');
const auth = (req, res, next) => {
  let token = req.headers.authtoken;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });
}
module.exports = { auth }