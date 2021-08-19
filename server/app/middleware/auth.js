const { User } = require('../models/UserModel');
const auth = async function(req, res, next) {
  try {
    let token = req.headers.authtoken;
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    throw err;
  }
}
module.exports = { auth }