const db = require("../db/db");

module.exports = {
    // Crear una nueva placa
    createPlaca: (req, res) => {
        const { placa } = req.body;

        const query = "EXEC sp_InsertPlaca @placa = ?";
        db.query(query, [placa], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar placa", details: err.message });
            }
            res.status(201).json({ message: "Placa creada", newPlacaId: rows[0].NewPlacaId });
        });
    },

    // Obtener todas las placas
    getPlacas: (req, res) => {
        const query = "EXEC sp_GetPlacas";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener placas", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener una placa por ID
    getPlacaById: (req, res) => {
        const { id_placa } = req.params;

        const query = "EXEC sp_GetPlacaById @id_placa = ?";
        db.query(query, [id_placa], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener placa", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Placa no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar una placa
    updatePlaca: (req, res) => {
        const { id_placa } = req.params;
        const { placa } = req.body;

        const query = "EXEC sp_UpdatePlaca @id_placa = ?, @placa = ?";
        db.query(query, [id_placa, placa], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Placa no encontrada" });
                }
                return res.status(500).json({ error: "Error al actualizar placa", details: err.message });
            }
            res.status(200).json({ message: "Placa actualizada" });
        });
    },

    // Eliminar una placa
    deletePlaca: (req, res) => {
        const { id_placa } = req.params;

        const query = "EXEC sp_DeletePlaca @id_placa = ?";
        db.query(query, [id_placa], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Placa no encontrada" });
                }
                return res.status(500).json({ error: "Error al eliminar placa", details: err.message });
            }
            res.status(200).json({ message: "Placa eliminada" });
        });
    },
};
