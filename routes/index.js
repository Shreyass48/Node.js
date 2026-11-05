const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey welcome toh the project ;)");
});

module.exports = router;
