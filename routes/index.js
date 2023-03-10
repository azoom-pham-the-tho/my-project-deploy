var express = require("express");
var router = express.Router();

router.get("/health", function (req, res) {
  res.status(200).json({ message: "ok" });
});

router.get("/secret", function (req, res) {
  res.status(200).json({ secret: process.env.SECRET });
});

module.exports = router;
