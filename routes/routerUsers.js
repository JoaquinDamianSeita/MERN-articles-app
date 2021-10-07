const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const routerUsers = express.Router();

routerUsers.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

routerUsers.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

routerUsers.get("/auth/facebook", passport.authenticate("facebook"));

routerUsers.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/faillogin",
    session: false,
  }),
  (req, res, next) => {
    const token = req.user.token;
    res.cookie("auth", token);
    res.redirect("http://localhost:3000/");
  }
);

routerUsers.get("/faillogin", (req, res) => {
  res.status(401).send({ error: "no se pudo autenticar con facebook" });
});

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromHeader("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = routerUsers;
