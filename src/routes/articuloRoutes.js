const express = require("express");
const router = express.Router();
const articuloController = require("../controllers/articuloController");

// Rutas CRUD para "articulos"
router.post("/", articuloController.createArticulo); // Crear un artículo
router.get("/", articuloController.getArticulos); // Obtener todos los artículos
router.get("/:id_artic", articuloController.getArticuloById); // Obtener un artículo por ID
router.put("/:id_artic", articuloController.updateArticulo); // Actualizar un artículo
router.delete("/:id_artic", articuloController.deleteArticulo); // Eliminar un artículo

module.exports = router;
