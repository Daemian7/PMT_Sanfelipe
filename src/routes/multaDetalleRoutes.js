const express = require("express");
const {
    getDetallesByMultaId,
    createDetalle,
    updateDetalle,
    deleteDetalle
} = require("../controllers/multaDetalleController");

const router = express.Router();

router.get("/:id", getDetallesByMultaId); // Obtener detalles de una multa
router.post("/:id", createDetalle); // Agregar un detalle a una multa
router.put("/:id/:id_detalle", updateDetalle); // Actualizar un detalle específico
router.delete("/:id/:id_detalle", deleteDetalle); // Eliminar un detalle específico

module.exports = router;
