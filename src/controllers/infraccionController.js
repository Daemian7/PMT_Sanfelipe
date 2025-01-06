const db = require("../db/db");

module.exports = {
    // Crear una nueva infracción
    createInfraccion: (req, res) => {
        const { tipo_infrac } = req.body;

        const query = "EXEC sp_InsertInfraccion @tipo_infrac = ?";
        db.query(query, [tipo_infrac], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar infracción", details: err.message });
            }
            res.status(201).json({ message: "Infracción creada", newInfraccionId: rows[0].NewInfraccionId });
        });
    },

    // Obtener todas las infracciones
    getInfracciones: (req, res) => {
        const query = "EXEC sp_GetInfracciones";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener infracciones", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener una infracción por ID
    getInfraccionById: (req, res) => {
        const { id_ifrac } = req.params;

        const query = "EXEC sp_GetInfraccionById @id_ifrac = ?";
        db.query(query, [id_ifrac], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener infracción", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Infracción no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar una infracción
    updateInfraccion: (req, res) => {
        const { id_ifrac } = req.params;
        const { tipo_infrac } = req.body;

        const query = "EXEC sp_UpdateInfraccion @id_ifrac = ?, @tipo_infrac = ?";
        db.query(query, [id_ifrac, tipo_infrac], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Infracción no encontrada" });
                }
                return res.status(500).json({ error: "Error al actualizar infracción", details: err.message });
            }
            res.status(200).json({ message: "Infracción actualizada" });
        });
    },

    // Eliminar una infracción
    deleteInfraccion: (req, res) => {
        const { id_ifrac } = req.params;

        const query = "EXEC sp_DeleteInfraccion @id_ifrac = ?";
        db.query(query, [id_ifrac], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Infracción no encontrada" });
                }
                return res.status(500).json({ error: "Error al eliminar infracción", details: err.message });
            }
            res.status(200).json({ message: "Infracción eliminada" });
        });
    },
};
