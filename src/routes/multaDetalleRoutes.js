const express = require("express");
const { createMultaDetalle, getAllMultaDetalles, getMultaDetalleById, updateMultaDetalle } = require("../controllers/multaDetalleController");

const router = express.Router();

router.post("/", createMultaDetalle);
router.get("/", getAllMultaDetalles);
router.get("/:id", getMultaDetalleById);
router.put("/:id", updateMultaDetalle);
// router.get("/suma/:id", getMultaSubtotales);

module.exports = router;
