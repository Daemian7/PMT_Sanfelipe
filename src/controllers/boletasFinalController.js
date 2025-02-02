const db = require("../db/db");

const insertBoletaFinal = async (req, res) => {
    try {
        const { vencimiento } = req.body;

        if (!vencimiento) {
            return res.status(400).json({ message: "La fecha de vencimiento es obligatoria" });
        }

        const query = "EXEC sp_InsertBoletaFinal @Vencimiento = ?";
        await db.query(query, [vencimiento]);

        res.status(201).json({ message: "Boleta final insertada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al insertar la boleta final", error: error.message });
    }
};

const getBoletas = (req, res) => {
    const query = "EXEC sp_GetBoletas"; // Llamada al procedimiento almacenado

    db.query(query, [], (err, rows) => {
        if (err) {
            console.error("Error ejecutando sp_GetBoletas:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        res.json(rows);
    });
};

module.exports = { insertBoletaFinal, getBoletas };