const express = require("express");
const router = express.Router();
const boletaVehiculoController = require("../controllers/boletaVehiculoController");

// Rutas CRUD
router.post("/boletas", boletaVehiculoController.crearBoleta); // Crear
router.get("/boletas/:id?", boletaVehiculoController.obtenerBoletas); // Obtener (por ID o todas)
router.put("/boletas/:id", boletaVehiculoController.actualizarBoleta); // Actualizar


module.exports = router;

