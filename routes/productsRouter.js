const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { image, name, price, discount, bgcolor, panelcolor, textcolor } =
      req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    return res.status(201).json({ msg: "Product Creaded!", data: product });
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
