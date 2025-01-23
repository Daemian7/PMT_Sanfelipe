const db = require("../db/db");

// Crear un artículo
exports.crearArticulo = (req, res) => {
    const { numero_artic, detalle, precio } = req.body;
    const query = "EXEC sp_InsertarArticulo @numero_artic = ?, @detalle = ?, @precio = ?";
    const params = [numero_artic, detalle, precio];
  
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Error al insertar artículo:", err);
        return res.status(500).json({ error: "Error al insertar artículo" });
      }
  
      // Log para depurar el resultado del procedimiento
      console.log("Resultado del procedimiento:", result);
  
      if (!result || result.length === 0 || !result[0].id_artic) {
        console.error("El procedimiento no devolvió el ID del artículo.");
        return res.status(500).json({ error: "No se pudo obtener el ID del artículo creado" });
      }
  
      const id_artic = result[0].id_artic;
      res.status(201).json({ message: "Artículo creado", id: id_artic });
    });
  };
  
  
  // Obtener todos los artículos o uno por ID
  exports.obtenerArticulos = (req, res) => {
    const id_artic = req.params.id || null;
    const query = id_artic
      ? "EXEC sp_ObtenerArticulos @id_artic = ?"
      : "EXEC sp_ObtenerArticulos";
    const params = id_artic ? [id_artic] : [];
  
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Error al obtener artículos:", err);
        return res.status(500).json({ error: "Error al obtener artículos" });
      }
      res.json(result);
    });
  };
  
  // Actualizar un artículo
  exports.actualizarArticulo = (req, res) => {
    const id_artic = req.params.id;
    const { numero_artic, detalle, precio } = req.body;
    const query =
      "EXEC sp_ActualizarArticulo @id_artic = ?, @numero_artic = ?, @detalle = ?, @precio = ?";
    const params = [id_artic, numero_artic, detalle, precio];
  
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Error al actualizar artículo:", err);
        return res.status(500).json({ error: "Error al actualizar artículo" });
      }
      const filas_actualizadas = result[0]?.filas_actualizadas;
      if (filas_actualizadas === 0) {
        return res.status(404).json({ message: "Artículo no encontrado" });
      }
      res.json({ message: "Artículo actualizado" });
    });
  };