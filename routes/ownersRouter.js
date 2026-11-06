const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("hi");
});
// if (process.env.NODE_ENV === "development") console.log("hey");

router.post("/create", async (req, res) => {
  const { fullname, email, password } = req.body;
  // you can validate with zod here
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .status(503)
      .json({ msg: "You dont have permissions to create new owner" });
  }

  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
  });

  res.status(201).json({ user: createdOwner });
});

router.post("/admin", async (req, res) => {
  res.json({ msg: "test" });
});

module.exports = router;
