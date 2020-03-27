const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    jwt.verify(token, config.get("jwtToken"), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "token is invalid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("smotheing went wrong with middleware");
    res.status(500).json({ msg: "server error" });
  }
};
