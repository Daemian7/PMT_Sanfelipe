const express = require("express");
const router = express.Router();
const boletaVehiculoController = require("../controllers/boletaVehiculoController");

// Rutas CRUD
router.post("/", boletaVehiculoController.createBoletaVehiculo);
router.get("/", boletaVehiculoController.getBoletasVehiculo);
router.put("/:id", boletaVehiculoController.updateBoletaVehiculo);


module.exports = router;

