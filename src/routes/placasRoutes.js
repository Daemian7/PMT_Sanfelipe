const express = require("express");
const router = express.Router();
const placasController = require("../controllers/placasController");

// Rutas CRUD para "placas"
router.post("/", placasController.createPlaca); // Crear una placa
router.get("/", placasController.getPlacas); // Obtener todas las placas
router.get("/:id_placa", placasController.getPlacaById); // Obtener una placa por ID
router.put("/:id_placa", placasController.updatePlaca); // Actualizar una placa
router.delete("/:id_placa", placasController.deletePlaca); // Eliminar una placa

module.exports = router;
