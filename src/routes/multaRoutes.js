const express = require("express");
const router = express.Router();
const multaController = require("../controllers/multaController");

<<<<<<< HEAD
router.post("/", createMulta);
router.get("/", getAllMultas);
router.get("/:id", getMultaById);
router.put("/:id", updateMulta);
// router.put("/update-total/:id", updateMultaTotal);
=======
// Crear una nueva multa
router.post("/", multaController.createMulta);
>>>>>>> dev

// Obtener todas las multas
router.get("/", multaController.getMultas);

// Obtener una multa por ID
router.get("/:id", multaController.getMultaById);

// Actualizar una multa
router.put("/:id", multaController.updateMulta);

router.post("/insert", multaController.agregarMulta);

module.exports = router;
