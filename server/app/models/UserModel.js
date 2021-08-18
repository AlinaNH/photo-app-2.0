const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true,"The email field is required!"],
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: [true,"The password field is required!"],
    minlength: 5
  },
  token: {
    type: String
  }
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash;
        next();
      });
    });
  } else {
  next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, callBack) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
}

userSchema.methods.generateToken = function (callBack) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  user.save(function (err, user) {
    if (err) return callBack(err)
    callBack(null, user)
  });
};

userSchema.statics.findByToken = function (token, callBack) {
  const user = this;
  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ "_id": decode, "token": token }, function (err, user) {
      if (err) return callBack(err);
      callBack(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };