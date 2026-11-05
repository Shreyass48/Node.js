const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  // if token not present
  if (!req.cookies.token) {
    return res.json({ msg: "Need to login first" });
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    // adding data to req.user like auth context
    req.user = user;

    next();
  } catch (e) {
    return res.json({ msg: "Need to login first" });
  }
};
