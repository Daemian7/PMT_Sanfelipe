const express = require("express");
const router = express.Router();
const { insertBoletaFinal, getBoletas } = require("../controllers/boletasFinalController");

router.post("/", insertBoletaFinal);
router.get("/", getBoletas);

module.exports = router;
