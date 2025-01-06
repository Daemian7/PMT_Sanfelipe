const express = require("express");
const {
    getAllBoletasFinales,
    getBoletaFinalById,
    createBoletaFinal,
    updateBoletaFinal,
} = require("../controllers/boletasFinalController");

const router = express.Router();

// Endpoints para boletas finales
router.get("/", getAllBoletasFinales);
router.get("/:id", getBoletaFinalById);
router.post("/", createBoletaFinal);
router.put("/:id", updateBoletaFinal);

module.exports = router;
