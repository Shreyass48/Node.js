const bcrypt = require("bcrypt");

const generateHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
const compareHash = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports.generateHash = generateHash;
module.exports.compareHash = compareHash;
