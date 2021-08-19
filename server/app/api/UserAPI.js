module.exports = (app) => {
  const { User } = require("../models/UserModel");
  const { auth } = require("..//middleware/auth");

  app.post('/users/register', async (req, res) => {
    try {
      const user = new User(req.body);
      const doc  = await user.save();
      const userData = {
        email: doc.email,
      }
      return res.status(200).json({
        success: true,
        message: "Successfully Signed Up",
        userData
      });
    } catch (err) {
      return res.status(400).send({ err });
    }
  });

  app.post('/users/login', async (req, res) => {
    try {
      const user = await User.findOne({ "email": req.body.email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User email not found!" });
      } else {
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: "Wrong Password!" });
        } else {
          user.generateToken();
          const data = {
            userID: user._id,
            email: user.email,
            token: user.token
          };
          res.status(200).json({
            success: true,
            message: "Successfully Logged In!",
            userData: data
          });
        }
      }
    } catch (err) {
      return res.status(400).send({ err });
    }
  });

  app.get('/users/auth', auth, async (req, res) => {
    return res.status(200).json({
      isAuthenticated: true
    });
  });

  app.get('/users/logout', auth, async (req, res) => {
    try {
      await User.findByIdAndUpdate({ _id: req.user._id }, { token: "" });
      return res.status(200).send({ success: true, message: "Successfully Logged Out!" });
    } catch (err) {
      return res.json({ success: false, err });
    }
  });
};