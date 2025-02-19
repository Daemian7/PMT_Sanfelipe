const db = require("../db/db");

module.exports = {
    // Crear una nueva multa
    createMulta: (req, res) => {
        const { id_boleta, total } = req.body;

        const query = "EXEC sp_InsertMulta @id_boleta = ?, @total = ?";
        db.query(query, [id_boleta, total], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar multa", details: err.message });
            }
            res.status(201).json({ message: "Multa creada", newMultaId: rows[0].NewMultaId });
        });
    },

    // Obtener todas las multas
    getMultas: (req, res) => {
        const query = "EXEC sp_GetMultas";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener multas", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener una multa por ID
    getMultaById: (req, res) => {
        const { id_multa } = req.params;

        const query = "EXEC sp_GetMultaById @id_multa = ?";
        db.query(query, [id_multa], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener multa", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Multa no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar una multa
    updateMulta: (req, res) => {
        const { id_multa } = req.params;
        const { id_boleta, total } = req.body;

        const query = "EXEC sp_UpdateMulta @id_multa = ?, @id_boleta = ?, @total = ?";
        db.query(query, [id_multa, id_boleta, total], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Multa no encontrada" });
                }
                return res.status(500).json({ error: "Error al actualizar multa", details: err.message });
            }
            res.status(200).json({ message: "Multa actualizada" });
        });
    },
    

       // Insertar una nueva multa automáticamente
//        insertMulta : async (req, res) => {
//         try {
//             const query = "EXEC sp_AddMulta;"; // Ejecutar el procedimiento almacenado
    
//             const result = await new Promise((resolve, reject) => {
//                 db.query(query, [], (error, rows) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(rows);
//                     }
//                 });
//             });
    
//             res.status(201).json({ message: "Multa insertada correctamente", result });
//         } catch (error) {
//             console.error("Error al insertar multa:", error);
//             res.status(500).json({ error: "Error al insertar multa", details: error.message });
//         }
//     },

agregarMulta : async (req, res) => {
    const { total } = req.body;

    const query = "EXEC sp_AddMulta @total = ?";

    db.query(query, [total], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al insertar la multa", details: err.message });
        }
        res.status(201).json({ message: "Multa insertada correctamente", id_multa: result[0].NuevoID });
    });
},

 };

<<<<<<< HEAD
// // Actualizar el total de una multa basado en los subtotales de multa_detalle
// const updateMultaTotal = (req, res) => {
//   const { id } = req.params;
//   const query = "EXEC sp_UpdateMultaTotal @id_multa = ?";

//   db.query(query, [id], (err) => {
//     if (err) {
//       res.status(500).send({ error: "Error al actualizar el total de la multa", details: err });
//     } else {
//       res.status(200).send({ message: "Total de la multa actualizado correctamente" });
//     }
//   });
// };

module.exports = { createMulta, getAllMultas, getMultaById, updateMulta };
=======


>>>>>>> dev
