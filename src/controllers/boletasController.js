const db = require("../db/db");
<<<<<<< HEAD
const getAllBoletas = (req, res) => {
=======

// Insertar una boleta
const insertBoleta = async (req, res) => {
  try {
    const { ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac } = req.body;

    // Ejecutar el procedimiento almacenado directamente
    const query = `
      EXEC sp_AddInfoBoleta 
        @ubicacion = ?, 
        @fecha = ?, 
        @hora = ?, 
        @id_usuario = ?, 
        @observaciones = ?, 
        @id_firma = ?, 
        @id_infrac = ?;
    `;

    const params = [ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac];

    const result = await db.query(query, params);

    console.log("Resultado de la consulta:", result);

    res.json({ message: "Boleta insertada correctamente", result });
  } catch (error) {
    console.error("Error al insertar boleta:", error);
    res.status(500).json({ error: "Error al insertar boleta", details: error.message });
  }
};



  
  
  const getBoletas = async (req, res) => {
>>>>>>> dev
    const query = "EXEC sp_GetInfoBoletas";
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [], (err, result) => {
          if (err) {
            reject(err);  // Si hay error, rechazamos la promesa
          } else {
            resolve(result);  // Si todo va bien, resolvemos la promesa
          }
        });
      });
  
      // Enviar respuesta solo una vez después de la consulta
      res.json(result);
  
    } catch (err) {
      console.error("Error al obtener boletas:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message });
      }
    }
  };
  

  // Actualizar una boleta
  const updateBoleta = (req, res) => {
    const { id_info, ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infra, id_boleta } = req.body;
    const id = req.params.id; // Si el ID viene de la URL

    const query = `
        UPDATE boletas 
        SET id_info = ?, ubicacion = ?, fecha = ?, hora = ?, id_usuario = ?, observaciones = ?, id_firma = ?, id_infra = ?, id_boleta = ? 
        WHERE id_info = ?
    `;

    const params = [id_info, ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infra, id_boleta, id];

    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Error al actualizar boleta:", err);
            return res.status(500).json({ error: "Error al actualizar boleta" });
        }
        res.json({ message: "Boleta actualizada correctamente" });
    });
};

  
  
  
  module.exports = {
    insertBoleta,
    getBoletas,
    updateBoleta,
  };