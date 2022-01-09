const mongoose = require("mongoose");
const validator = require("validator");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./taskModel");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error("It Must be Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: Buffer,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }
  next();
});

userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
userSchema.statics.loginByCreditional = async function (email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.send({ error: "Please Register First" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error("Wrong Password");
    }
    return user;
  } catch (e) {
    res.send(e);
  }
};
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
