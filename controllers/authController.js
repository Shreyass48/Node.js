const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generate-token");
const { generateHash, compareHash } = require("../utils/generate-hash");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    let isFound = await userModel.findOne({ email: email });
    if (isFound)
      return res.status(401).json({ msg: "email already registered" });

    // bcrypt: hashing password
    const hash = generateHash(password);

    let user = await userModel.create({ email, password: hash, fullname });

    // jwt : cookie set
    let token = generateToken(user);
    res.cookie("token", token);

    res.header(token).json({ msg: "User created!", userInfo: user });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(500).json({ msg: "User not found." });

    let result = await compareHash(password, user.password);

    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.json({ msg: "Login successfully" });
    } else {
      res.status(500).json({ msg: "Email or Password Incorresct." });
    }
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", "");
  return res.json("Logout");
};
