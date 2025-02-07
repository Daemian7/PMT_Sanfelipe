const db = require('../db/db'); // Asegúrate de que la ruta sea correcta

// // Función para agregar un detalle a la multa y actualizar el total
// const agregarDetalleYActualizarTotal = (req, res) => {
//     const { id_multa, id_articulo } = req.body;

//     // 1. Insertar el detalle de la multa
//     const insertDetalleQuery = `
//         INSERT INTO multa_detalle (id_multa, id_articulo)
//         VALUES (?, ?);
//     `;

//     db.query(insertDetalleQuery, [id_multa, id_articulo], (err) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al insertar el detalle de la multa", details: err.message });
//         }

//         // 2. Sumar el total de los artículos relacionados con la multa
//         recalcularTotalMulta(id_multa, res, "Detalle agregado y total actualizado correctamente");
//     });
// };

// Función para actualizar un detalle de multa existente
const actualizarDetalleYActualizarTotal = (req, res) => {
    const { id_detalle, id_articulo } = req.body;

    // 1. Actualizar el detalle en la tabla multa_detalle
    const updateDetalleQuery = `
        UPDATE multa_detalle
        SET id_articulo = ?
        WHERE id_detalle = ?;
    `;

    db.query(updateDetalleQuery, [id_articulo, id_detalle], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el detalle de la multa", details: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Detalle no encontrado" });
        }

        // 2. Recalcular el total para la multa correspondiente
        const getMultaIdQuery = `
            SELECT id_multa
            FROM multa_detalle
            WHERE id_detalle = ?;
        `;

        db.query(getMultaIdQuery, [id_detalle], (err, result) => {
            if (err || result.length === 0) {
                return res.status(500).json({ error: "Error al encontrar la multa relacionada", details: err?.message });
            }

            const id_multa = result[0].id_multa;

            recalcularTotalMulta(id_multa, res, "Detalle actualizado y total recalculado correctamente");
        });
    });
};

// Función para obtener los detalles de una multa específica
const obtenerDetallesMulta = (req, res) => {
    const id_multa = parseInt(req.params.id_multa, 10); // Convierte el parámetro a número

    if (isNaN(id_multa)) {
        return res.status(400).json({ error: "El ID de la multa debe ser un número válido" });
    }

    const getDetallesQuery = `
        SELECT md.id_detalle, md.id_articulo, a.detalle, a.precio
        FROM multa_detalle md
        INNER JOIN articulos a ON md.id_articulo = a.id_artic
        WHERE md.id_multa = ?;
    `;

    db.query(getDetallesQuery, [id_multa], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener los detalles de la multa", details: err.message });
        }

        res.status(200).json(result);
    });
};

// Agregar un detalle de multa ejecutando el procedimiento almacenado
const agregarMultaDetalle = async (req, res) => {
    const { id_articulo } = req.body;

    if (!id_articulo) {
        return res.status(400).json({ error: "El campo 'id_articulo' es obligatorio." });
    }

    try {
        const query = "EXEC sp_AddMultaDetalle @id_articulo = ?";
        const result = await new Promise((resolve, reject) => {
            db.query(query, [id_articulo], (err, result) => err ? reject(err) : resolve(result));
        });

        return res.status(201).json({ message: "Detalle de multa insertado correctamente", result });
    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ error: "Error al insertar el detalle de la multa", details: error.message });
        }
    }
};

 
module.exports = {
    // agregarDetalleYActualizarTotal,
    actualizarDetalleYActualizarTotal,
    obtenerDetallesMulta,
    // insertarMultaDetalle,
    // insertarMultaConDetalles
    agregarMultaDetalle
};
