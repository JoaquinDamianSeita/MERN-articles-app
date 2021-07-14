const jwt = require("jsonwebtoken");
const express = require("express");
const routerLogin = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/user");

routerLogin.post("/", async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  const user = await User.findOne({ username });

  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && correctPassword)) {
    res.status(401).json({
      error: "invalid user or password",
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(
    userForToken,
    process.env.SECRETJWT,
    {
      expiresIn: 60*60*24*7
    }
  );

  
  res.send({ username: user.username, name: user.name, token });
});

module.exports = routerLogin;
