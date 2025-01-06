const express = require("express");
const {
    getAllBoletas,
    getBoletaById,
    createBoleta,
    updateBoleta,
    deleteBoleta,
} = require("../controllers/boletasController");

const router = express.Router();

// Define the routes and map them to the controller functions
router.get("/", getAllBoletas);
router.get("/:id", getBoletaById);
router.post("/", createBoleta);
router.put("/:id", updateBoleta);
router.delete("/:id", deleteBoleta);

module.exports = router;
