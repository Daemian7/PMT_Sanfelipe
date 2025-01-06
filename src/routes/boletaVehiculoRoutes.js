const express = require("express");
const router = express.Router();
const boletaVehiculoController = require("../controllers/boletaVehiculoController");

// Rutas CRUD para "BoletaVehiculo"
router.post("/", boletaVehiculoController.insertBoletaVehiculo); // Crear boleta
router.get("/", boletaVehiculoController.getAllBoletas); // Obtener todas las boletas
router.get("/:id_boleta", boletaVehiculoController.getBoletaById); // Obtener boleta por ID
router.put("/:id_boleta", boletaVehiculoController.updateBoletaVehiculo); // Actualizar boleta

module.exports = router;
