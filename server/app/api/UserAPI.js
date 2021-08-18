
module.exports = (app) => {
  const { User } = require("../models/UserModel");
  const { auth } = require("..//middleware/auth");
  app.post('/users/register', async (req, res) => {
    const user = new User(req.body);
    await user.save((err, doc) => {
      if (err) {
        return res.status(422).json({errors:err})
      } else {
        const userData = {
          email: doc.email,
        }
        return res.status(200).json({
          success: true,
          message: "Successfully Signed Up",
          userData
        });
      }
    });
  });

  app.post('/users/login', async (req, res) => {
    User.findOne({ "email": req.body.email }, (err, user) => {
      if (!user) {
        return res.status(404).json({ success: false, message: "User email not found!" });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ success: false, message: "Wrong Password!" });
          } else {
            user.generateToken((err, user) => {
              if (err) {
                return res.status(400).send({ err });
              } else {
                const data = {
                  userID: user._id,
                  email: user.email,
                  token: user.token
                };
                res.cookie("authToken", user.token).status(200).json({
                  success: true,
                  message: "Successfully Logged In!",
                  userData: data
                });
              }
            });
          }
        });
      }
    });
  });

  app.get('/users/auth', auth, async (req, res) => {
    return res.status(200).json({
      isAuthenticated: true
    });
  });

  app.get('/users/logout', auth, async (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.user._id }
      , { token: "" },
      (err) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({ success: true, message: "Successfully Logged Out!" });
      }
    );
  });
};