const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const passport = require("passport");
//necesario
const UserModel = require("./models/user");

const PORT = 3001;
const MONGODB_URI = "mongodb://localhost:27017/my_local_db";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.once("open", function () {
  console.log("Connected to the Database.");
});
mongoose.connection.on("error", function (error) {
  console.log("Mongoose Connection Error : " + error);
});

// const handleErrors = require("./middleware/handleErrors");

dotenv.config();

//aca requiero las estrategias
require("./auth/auth");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

//rutas agregadas con passport
const routerUsers = require("./routes/routerUsers");
const routerSecure = require("./routes/secure-routes");

const routerArticles = require("./routes/routerArticles");
const routerLogin = require("./routes/routerLogin");

//importamos nuestro objeto de enrutador y luego lo encadenamos a nuestro objeto de aplicación Express.
//El primer argumento '/ api' aplica nuestro objeto enrutador cuando se llama a la ruta '/ api'.
app.use("/api/articles", routerArticles);
app.use("/api/login", routerLogin);

//nuevo router y ruta protegida
app.use("/api/users", routerUsers);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  routerSecure
);

// app.use(handleErrors);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
