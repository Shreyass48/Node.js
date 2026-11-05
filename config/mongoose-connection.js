const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URL")}/ecommerce`)
  .then(() => {
    dbgr("MondoDB Connected!");
  })
  .catch((err) => {
    dbgr(err);
  });

module.exports = mongoose.connect;
