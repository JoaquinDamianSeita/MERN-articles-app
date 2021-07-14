
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRETJWT);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};
