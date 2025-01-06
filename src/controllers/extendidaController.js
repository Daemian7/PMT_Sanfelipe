const db = require("../db/db");

module.exports = {
    // Crear una nueva entrada extendida
    createExtendida: (req, res) => {
        const { ubicacion } = req.body;

        const query = "EXEC sp_InsertExtendida @ubicacion = ?";
        db.query(query, [ubicacion], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar extendida", details: err.message });
            }
            res.status(201).json({ message: "Extendida creada", newExtendidaId: rows[0].NewExtendidaId });
        });
    },

    // Obtener todas las entradas extendidas
    getExtendidas: (req, res) => {
        const query = "EXEC sp_GetExtendidas";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener extendidas", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener una entrada extendida por ID
    getExtendidaById: (req, res) => {
        const { id_exten } = req.params;

        const query = "EXEC sp_GetExtendidaById @id_exten = ?";
        db.query(query, [id_exten], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener extendida", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Extendida no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar una entrada extendida
    updateExtendida: (req, res) => {
        const { id_exten } = req.params;
        const { ubicacion } = req.body;

        const query = "EXEC sp_UpdateExtendida @id_exten = ?, @ubicacion = ?";
        db.query(query, [id_exten, ubicacion], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Extendida no encontrada" });
                }
                return res.status(500).json({ error: "Error al actualizar extendida", details: err.message });
            }
            res.status(200).json({ message: "Extendida actualizada" });
        });
    },

    // Eliminar una entrada extendida
    deleteExtendida: (req, res) => {
        const { id_exten } = req.params;

        const query = "EXEC sp_DeleteExtendida @id_exten = ?";
        db.query(query, [id_exten], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Extendida no encontrada" });
                }
                return res.status(500).json({ error: "Error al eliminar extendida", details: err.message });
            }
            res.status(200).json({ message: "Extendida eliminada" });
        });
    },
};
