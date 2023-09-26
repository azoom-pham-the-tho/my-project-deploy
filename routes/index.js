var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  if (req.connect) return res
    .status(200)
    .json({
      message: "connect ok", env: process.env
    });
  res
    .status(400)
    .json({ message: "connect error", env: process.env, error: req.error });
});

router.get("/health", function (req, res) {
  if (req.connect) return res.status(200).json({ message: "connect ok", env: process.env });
  res
    .status(400)
    .json({ message: "connect error", env: process.env, error: req.error });
});

router.get("/secret", function (req, res) {
  res.status(200).json({ secret: process.env.SECRET });
});

module.exports = router;
