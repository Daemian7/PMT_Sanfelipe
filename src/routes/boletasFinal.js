const express = require("express");
const router = express.Router();
const { insertBoletaFinal, getBoletas, updateBoletaEstado } = require("../controllers/boletasFinalController");

router.post("/", insertBoletaFinal);
router.get("/", getBoletas);
router.put("/:id_boleta", updateBoletaEstado);

module.exports = router;
