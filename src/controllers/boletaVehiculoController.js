const db = require("../db/db");

module.exports = {
    // Crear una nueva boleta de vehículo
    createBoletaVehiculo: (req, res) => {
        const {
            tipo_placa, placa_cod, id_vehiculo, nit_prop,
            tarjeta_circ, marca, color, tipo_licencia,
            no_licencia, no_doc_licencia, dpi, extendida,
            nombre, no_boleta
        } = req.body;

        const query = `EXEC sp_InsertarBoletaVehiculo 
            @tipo_placa = ?, @placa_cod = ?, @id_vehiculo = ?, @nit_prop = ?, 
            @tarjeta_circ = ?, @marca = ?, @color = ?, @tipo_licencia = ?, 
            @no_licencia = ?, @no_doc_licencia = ?, @dpi = ?, @extendida = ?, 
            @nombre = ?, @no_boleta = ?`;

        db.query(query, [
            tipo_placa, placa_cod, id_vehiculo, nit_prop,
            tarjeta_circ, marca, color, tipo_licencia,
            no_licencia, no_doc_licencia, dpi, extendida,
            nombre, no_boleta
        ], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar boleta de vehículo", details: err.message });
            }
            res.status(201).json({ message: "Boleta de vehículo creada", id_boleta: rows[0].id_boleta });
        });
    },

    // Obtener todas las boletas o una específica
    getBoletasVehiculo: (req, res) => {
        const { id_boleta } = req.query;

        const query = `EXEC sp_ObtenerBoletasVehiculo @id_boleta = ?`;
        db.query(query, [id_boleta || null], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener boletas de vehículo", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Actualizar una boleta de vehículo
    updateBoletaVehiculo: (req, res) => {
        const { id_boleta } = req.params;
        const {
            tipo_placa, placa_cod, id_vehiculo, nit_prop,
            tarjeta_circ, marca, color, tipo_licencia,
            no_licencia, no_doc_licencia, dpi, extendida,
            nombre, no_boleta
        } = req.body;

        const query = `EXEC sp_ActualizarBoletaVehiculo 
            @id_boleta = ?, @tipo_placa = ?, @placa_cod = ?, @id_vehiculo = ?, @nit_prop = ?, 
            @tarjeta_circ = ?, @marca = ?, @color = ?, @tipo_licencia = ?, 
            @no_licencia = ?, @no_doc_licencia = ?, @dpi = ?, @extendida = ?, 
            @nombre = ?, @no_boleta = ?`;

        db.query(query, [
            id_boleta, tipo_placa, placa_cod, id_vehiculo, nit_prop,
            tarjeta_circ, marca, color, tipo_licencia,
            no_licencia, no_doc_licencia, dpi, extendida,
            nombre, no_boleta
        ], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al actualizar boleta de vehículo", details: err.message });
            }
            if (rows[0].filas_actualizadas === 0) {
                return res.status(404).json({ message: "Boleta de vehículo no encontrada" });
            }
            res.status(200).json({ message: "Boleta de vehículo actualizada" });
        });
    },
};
