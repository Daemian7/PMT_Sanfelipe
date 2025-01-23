const db = require("../db/db");

exports.crearBoleta = (req, res) => {
    const {
        tipo_placa,
        placa_cod,
        id_vehiculo,
        nit_prop,
        tarjeta_circ,
        marca,
        color,
        tipo_licencia,
        no_licencia,
        no_doc_licencia,
        dpi,
        extendida,
        nombre,
        no_boleta,
    } = req.body;

    const query = `
        EXEC sp_InsertarBoletaVehiculo 
            @tipo_placa = ?, 
            @placa_cod = ?, 
            @id_vehiculo = ?, 
            @nit_prop = ?, 
            @tarjeta_circ = ?, 
            @marca = ?, 
            @color = ?, 
            @tipo_licencia = ?, 
            @no_licencia = ?, 
            @no_doc_licencia = ?, 
            @dpi = ?, 
            @extendida = ?, 
            @nombre = ?, 
            @no_boleta = ?
    `;

    db.query(query, [tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre, no_boleta], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al insertar la boleta" });
        }
        res.status(201).json({ message: "Boleta creada exitosamente", id_boleta: result.recordset[0].id_boleta });
    });
};

// Obtener boletas (todas o por ID)
exports.obtenerBoletas = (req, res) => {
    const { id } = req.params;

    const query = id
        ? `EXEC sp_ObtenerBoletasVehiculo @id_boleta = ?`
        : `EXEC sp_ObtenerBoletasVehiculo`;

    db.query(query, id ? [id] : [], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener boletas" });
        }
        res.status(200).json(result.recordset);
    });
};

// Actualizar una boleta
exports.actualizarBoleta = (req, res) => {
    const { id } = req.params;
    const {
        tipo_placa,
        placa_cod,
        id_vehiculo,
        nit_prop,
        tarjeta_circ,
        marca,
        color,
        tipo_licencia,
        no_licencia,
        no_doc_licencia,
        dpi,
        extendida,
        nombre,
        no_boleta,
    } = req.body;

    const query = `
        EXEC sp_ActualizarBoletaVehiculo 
            @id_boleta = ?, 
            @tipo_placa = ?, 
            @placa_cod = ?, 
            @id_vehiculo = ?, 
            @nit_prop = ?, 
            @tarjeta_circ = ?, 
            @marca = ?, 
            @color = ?, 
            @tipo_licencia = ?, 
            @no_licencia = ?, 
            @no_doc_licencia = ?, 
            @dpi = ?, 
            @extendida = ?, 
            @nombre = ?, 
            @no_boleta = ?
    `;

    db.query(query, [id, tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre, no_boleta], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al actualizar la boleta" });
        }
        res.status(200).json({ message: "Boleta actualizada exitosamente", filas_actualizadas: result.recordset[0].filas_actualizadas });
    });
};