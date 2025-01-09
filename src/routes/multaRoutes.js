const express = require("express");
const { createMulta, getAllMultas, getMultaById, updateMulta } = require("../controllers/multaController");

const router = express.Router();

router.post("/", createMulta);
router.get("/", getAllMultas);
router.get("/:id", getMultaById);
router.put("/:id", updateMulta);
// router.put("/update-total/:id", updateMultaTotal);


module.exports = router;
