const db = require("../db/db");

module.exports = {
    // Crear una nueva licencia
    createLicencia: (req, res) => {
        const { tipo_licen } = req.body;

        const query = "EXEC sp_InsertLicencia @tipo_licen = ?";
        db.query(query, [tipo_licen], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar licencia", details: err.message });
            }
            res.status(201).json({ message: "Licencia creada", newLicenciaId: rows[0].NewLicenciaId });
        });
    },

    // Obtener todas las licencias
    getLicencias: (req, res) => {
        const query = "EXEC sp_GetLicencias";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener licencias", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener una licencia por ID
    getLicenciaById: (req, res) => {
        const { id_licen } = req.params;

        const query = "EXEC sp_GetLicenciaById @id_licen = ?";
        db.query(query, [id_licen], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener licencia", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Licencia no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar una licencia
    updateLicencia: (req, res) => {
        const { id_licen } = req.params;
        const { tipo_licen } = req.body;

        const query = "EXEC sp_UpdateLicencia @id_licen = ?, @tipo_licen = ?";
        db.query(query, [id_licen, tipo_licen], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Licencia no encontrada" });
                }
                return res.status(500).json({ error: "Error al actualizar licencia", details: err.message });
            }
            res.status(200).json({ message: "Licencia actualizada" });
        });
    },

    // Eliminar una licencia
    deleteLicencia: (req, res) => {
        const { id_licen } = req.params;

        const query = "EXEC sp_DeleteLicencia @id_licen = ?";
        db.query(query, [id_licen], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Licencia no encontrada" });
                }
                return res.status(500).json({ error: "Error al eliminar licencia", details: err.message });
            }
            res.status(200).json({ message: "Licencia eliminada" });
        });
    },
};
