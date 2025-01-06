const db = require("../db/db");

module.exports = {
    // Insert a new BoletaVehiculo
    insertBoletaVehiculo: (req, res) => {
        const {
            tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color,
            tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre
        } = req.body;

        const query = `EXEC sp_InsertBoletaVehiculo 
            @tipo_placa = ?, @placa_cod = ?, @id_vehiculo = ?, @nit_prop = ?, 
            @tarjeta_circ = ?, @marca = ?, @color = ?, @tipo_licencia = ?, 
            @no_licencia = ?, @no_doc_licencia = ?, @dpi = ?, @extendida = ?, @nombre = ?`;

        db.query(
            query,
            [
                tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color,
                tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre,
            ],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error al insertar boleta", details: err.message });
                }
                res.status(201).json({ message: "Boleta creada con éxito" });
            }
        );
    },

    // Get all BoletaVehiculo
    getAllBoletas: (req, res) => {
        const query = "EXEC sp_GetBoletaVehiculo";
        db.query(query, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener las boletas", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Get BoletaVehiculo by ID
    getBoletaById: (req, res) => {
        const { id_boleta } = req.params;
        const query = "EXEC sp_GetBoletaVehiculoById @id_boleta = ?";

        db.query(query, [id_boleta], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener la boleta", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Boleta no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Update BoletaVehiculo
    updateBoletaVehiculo: (req, res) => {
        const { id_boleta } = req.params;
        const {
            tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color,
            tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre
        } = req.body;

        const query = `EXEC sp_UpdateBoletaVehiculo 
            @id_boleta = ?, @tipo_placa = ?, @placa_cod = ?, @id_vehiculo = ?, @nit_prop = ?, 
            @tarjeta_circ = ?, @marca = ?, @color = ?, @tipo_licencia = ?, 
            @no_licencia = ?, @no_doc_licencia = ?, @dpi = ?, @extendida = ?, @nombre = ?`;

        db.query(
            query,
            [
                id_boleta, tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca,
                color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre,
            ],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error al actualizar boleta", details: err.message });
                }
                res.status(200).json({ message: "Boleta actualizada con éxito" });
            }
        );
    },
};
