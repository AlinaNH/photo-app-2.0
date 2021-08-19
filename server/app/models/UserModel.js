const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required!"],
    trim: true,
    unique: [true, "The user exists!"],
    dropDups: [true, "The user exists!"]
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

userSchema.pre("save", async function(next) {
  try {
    const user = this;
    if (await user.isModified("password")) {
      const salt = await bcrypt.genSalt(SALT);
      if (salt) {
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
      }
    }
  } catch {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return err;
  }
}

userSchema.methods.generateToken = async function() {
  try {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    await user.save();
  } catch (err) {
    return err;
  }
};

userSchema.statics.findByToken = async function (token) {
  try {
    const user = this;
    const decode = await jwt.verify(token, process.env.SECRET);
    return await user.findOne({ "_id": decode, "token": token });
  } catch {
    return err;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = { User };