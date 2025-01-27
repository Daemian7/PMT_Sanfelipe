const db = require("../db/db");

const insertBoleta = (req, res) => {
    const {
        tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color,
        tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre, no_boleta
    } = req.body;

    const query = `
        EXEC sp_InsertarBoletaVehiculo 
        @tipo_placa = ?, @placa_cod = ?, @id_vehiculo = ?, @nit_prop = ?, 
        @tarjeta_circ = ?, @marca = ?, @color = ?, @tipo_licencia = ?, 
        @no_licencia = ?, @no_doc_licencia = ?, @dpi = ?, @extendida = ?, 
        @nombre = ?, @no_boleta = ?;
    `;

    db.query(query, [tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre, no_boleta], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id_boleta: result[0].id_boleta });
    });
};

const getBoletas = (req, res) => {
    const { id_boleta } = req.query;

    const query = id_boleta
        ? "EXEC sp_ObtenerBoletasVehiculo @id_boleta = ?"
        : "EXEC sp_ObtenerBoletasVehiculo";

    db.query(query, id_boleta ? [id_boleta] : [], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    });
};

const updateBoleta = (req, res) => {
    const {
        id_boleta, tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca,
        color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre, no_boleta
    } = req.body;

    const query = `
        EXEC sp_ActualizarBoletaVehiculo
        @id_boleta = ?, @tipo_placa = ?, @placa_cod = ?, @id_vehiculo = ?, @nit_prop = ?, 
        @tarjeta_circ = ?, @marca = ?, @color = ?, @tipo_licencia = ?, @no_licencia = ?, 
        @no_doc_licencia = ?, @dpi = ?, @extendida = ?, @nombre = ?, @no_boleta = ?;
    `;

    db.query(query, [id_boleta, tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre, no_boleta], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ filas_actualizadas: result[0].filas_actualizadas });
    });
};

module.exports = { insertBoleta, getBoletas, updateBoleta };
