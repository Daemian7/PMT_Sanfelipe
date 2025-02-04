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

const updateBoletaEstado = async (req, res) => {
    const { id_boleta } = req.params;
    const { estado } = req.body;

    console.log("ID Boleta:", id_boleta);  // Verifica el ID de boleta
    console.log("Estado recibido:", estado);  // Verifica el estado recibido

    if (!id_boleta || estado === undefined) {
        return res.status(400).json({ error: "ID de boleta y estado son requeridos" });
    }

    const query = "UPDATE boleta_final SET estado = ? WHERE id_boleta = ?";

    db.query(query, [estado, id_boleta], (err, result) => {
        if (err) {
            console.error("Error al actualizar estado:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        res.json({ message: "Estado actualizado correctamente", affectedRows: result.rowsAffected });
    });
};


module.exports = { insertBoletaFinal, getBoletas, updateBoletaEstado };