const express = require("express");
const router = express.Router();
const isloggedIn = require("../middleware/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  res.send("Hey welcome toh the project ;)");
});

router.get("/shop", isloggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ data: products });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/cart", isloggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    const bill =
      Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

    res.json({ data: user.cart, finalAmt: bill });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/addtocart/:productid", isloggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    res.json({ msg: "Added to cart", userCart: user.cart });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
