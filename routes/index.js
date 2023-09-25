var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({ message: "ok" });
});

router.get("/health", function (req, res) {
  if (req.connect) return res.status(200).json({ message: "connect ok" });
  res.status(400).json({ message: "connect error" });
});

router.get("/secret", function (req, res) {
  res.status(200).json({ secret: process.env.SECRET });
});

module.exports = router;
