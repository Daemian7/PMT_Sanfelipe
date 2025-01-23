const express = require("express");
const router = express.Router();
const articulosController = require("../controllers/articuloController");

// Rutas CRUD para "articulos"
router.post("/", articulosController.crearArticulo);
router.get("/:id?", articulosController.obtenerArticulos);
router.put("/:id", articulosController.actualizarArticulo);

module.exports = router;
