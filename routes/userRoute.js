const User = require("../models/userModel");
const { Router } = require("express");
const auth = require("../middleware/auth");
const route = new Router();

// Creating New User
route.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.getAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login User
route.post(
  "/users/login",
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.loginByCreditional(email, password);
      const token = await user.getAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(404).send({
        error: "Wrong Email Or Password",
      });
    }
  },
  (error, req, res, next) => {
    res.send(error);
  }
);

// logOut User
route.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete User
route.post("/users/delete", auth, async (req, res) => {
  try {
    req.user.remove();
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = route;
