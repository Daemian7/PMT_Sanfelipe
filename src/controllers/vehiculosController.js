const db = require("../db/db");

module.exports = {
    // Crear un nuevo vehículo
    createVehiculo: (req, res) => {
        const { nombre } = req.body;

        const query = "EXEC sp_InsertVehiculo @nombre = ?";
        db.query(query, [nombre], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar vehículo", details: err.message });
            }
            res.status(201).json({ message: "Vehículo creado", newVehiculoId: rows[0].NewVehiculoId });
        });
    },

    // Obtener todos los vehículos
    getVehiculos: (req, res) => {
        const query = "EXEC sp_GetVehiculos";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener vehículos", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener un vehículo por ID
    getVehiculoById: (req, res) => {
        const { id_vehiculo } = req.params;

        const query = "EXEC sp_GetVehiculoById @id_vehiculo = ?";
        db.query(query, [id_vehiculo], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener vehículo", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Vehículo no encontrado" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar un vehículo
    updateVehiculo: (req, res) => {
        const { id_vehiculo } = req.params;
        const { nombre } = req.body;

        const query = "EXEC sp_UpdateVehiculo @id_vehiculo = ?, @nombre = ?";
        db.query(query, [id_vehiculo, nombre], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Vehículo no encontrado" });
                }
                return res.status(500).json({ error: "Error al actualizar vehículo", details: err.message });
            }
            res.status(200).json({ message: "Vehículo actualizado" });
        });
    },

    // Eliminar un vehículo
    deleteVehiculo: (req, res) => {
        const { id_vehiculo } = req.params;

        const query = "EXEC sp_DeleteVehiculo @id_vehiculo = ?";
        db.query(query, [id_vehiculo], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Vehículo no encontrado" });
                }
                return res.status(500).json({ error: "Error al eliminar vehículo", details: err.message });
            }
            res.status(200).json({ message: "Vehículo eliminado" });
        });
    },
};
