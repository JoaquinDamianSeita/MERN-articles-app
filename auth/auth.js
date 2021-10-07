const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("../models/user");

const jwt = require("jsonwebtoken");

const FACEBOOK_CLIENT_ID = "";
const FACEBOOK_CLIENT_SECRET = "";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "User not found/Wrong Password",
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: "User not found/Wrong Password",
          });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/users/auth/facebook/callback",
      profileFields: ["id", "name", "email"],
      scope: ["email"],
    },
    function (accessToken, refreshToken, profile, done) {
      let userProfile = profile;

      const body = {
        _id: userProfile._json.id,
        email: userProfile._json.email,
      };
      const token = jwt.sign({ user: body }, "TOP_SECRET");

      userProfile.token = token;

      return done(null, userProfile);
    }
  )
);
