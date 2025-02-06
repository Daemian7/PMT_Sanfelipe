const db = require("../db/db");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.buscarBoletas = async(req, res) => {
    const { tipoPlaca, placaCod } = req.body;

    const query = `
 SELECT 
    BV.no_boleta, 
    p.placa_inicial, 
    BV.placa_cod, 
    v.nombre AS tipo_vehiculo, 
    BV.nit_prop, 
    BV.tarjeta_circ, 
    BV.marca, 
    BV.color, 
    l.tipo_licen, 
    BV.no_licencia, 
    BV.no_doc_licencia,
    BV.dpi, 
    e.ubicacion, 
    BV.nombre, 
    es.estado,
    SUM(a.precio) AS total_precio -- SUMAMOS EL PRECIO DE LOS ARTÍCULOS POR BOLETA
FROM boleta_vehiculo BV
INNER JOIN placa p ON p.id_placa = BV.tipo_placa
INNER JOIN vehiculos v ON v.id_vehiculo = BV.id_vehiculo
INNER JOIN extendida e ON e.id_exten = BV.extendida
INNER JOIN boleta_final bf ON bf.id_boleta = BV.id_boleta
INNER JOIN estados es ON es.id_estado = bf.estado
INNER JOIN licencia l ON l.id_licen = BV.tipo_licencia
INNER JOIN multa m ON m.id_boleta = BV.id_boleta
INNER JOIN multa_detalle dm ON dm.id_multa = m.id_multa
INNER JOIN articulos a ON a.id_artic = dm.id_articulo
WHERE 
    p.id_placa = ? AND 
    BV.placa_cod = ? AND 
    es.id_estado = 1
GROUP BY 
    BV.no_boleta, 
    p.placa_inicial, 
    BV.placa_cod, 
    v.nombre, 
    BV.nit_prop, 
    BV.tarjeta_circ, 
    BV.marca, 
    BV.color, 
    l.tipo_licen, 
    BV.no_licencia, 
    BV.no_doc_licencia, 
    BV.dpi, 
    e.ubicacion, 
    BV.nombre, 
    es.estado;

    `;

    db.query(query, [tipoPlaca, placaCod], (err, rows) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ error: "Error al realizar la búsqueda" });
        }
        res.json(rows);
    });
};



exports.generarPDF = async (req, res) => {
    const { tipoPlaca, placaCod } = req.query;

    const query = `
        	SELECT 
    BV.no_boleta, 
    p.placa_inicial, 
    BV.placa_cod, 
    v.nombre AS tipo_vehiculo, 
    BV.nit_prop, 
    BV.tarjeta_circ, 
    BV.marca, 
    BV.color, 
    l.tipo_licen, 
    BV.no_licencia, 
    BV.no_doc_licencia,
    BV.dpi, 
    e.ubicacion, 
    BV.nombre, 
    es.estado,
    a.precio,
	a.numero_artic,
	a.detalle
FROM boleta_vehiculo BV
INNER JOIN placa p ON p.id_placa = BV.tipo_placa
INNER JOIN vehiculos v ON v.id_vehiculo = BV.id_vehiculo
INNER JOIN extendida e ON e.id_exten = BV.extendida
INNER JOIN boleta_final bf ON bf.id_boleta = BV.id_boleta
INNER JOIN estados es ON es.id_estado = bf.estado
INNER JOIN licencia l ON l.id_licen = BV.tipo_licencia
INNER JOIN multa m ON m.id_boleta = BV.id_boleta
INNER JOIN multa_detalle dm ON dm.id_multa = m.id_multa
INNER JOIN articulos a ON a.id_artic = dm.id_articulo
        WHERE p.id_placa = ? AND BV.placa_cod = ? AND es.id_estado = 1;
    `;

    db.query(query, [tipoPlaca, placaCod], (err, rows) => {
        if (err) {
            console.error("Error generando PDF:", err);
            return res.status(500).json({ error: "Error generando el PDF" });
        }

        // Si hay registros, obtenemos el nombre de la placa del primer resultado
        if (rows.length > 0) {
            generarPDFconDatos(res, rows, placaCod, rows[0].placa_inicial);
        } else {
            // 🔹 Si no hay registros, obtenemos el nombre de la placa desde la tabla `placa`
            const placaQuery = `SELECT placa_inicial FROM placa WHERE id_placa = ?`;

            db.query(placaQuery, [tipoPlaca], (err, result) => {
                if (err) {
                    console.error("Error obteniendo el tipo de placa:", err);
                    return res.status(500).json({ error: "Error generando el PDF" });
                }

                // Si encontramos el nombre de la placa, lo usamos; de lo contrario, mostramos el ID como fallback
                const placaNombre = result.length > 0 ? result[0].placa_inicial : tipoPlaca;
                generarPDFconDatos(res, [], placaCod, placaNombre);
            });
        }
    });
};

// 🔹 **Función auxiliar para generar el PDF con los datos obtenidos**
function generarPDFconDatos(res, rows, placaCod, placaNombre) {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Disposition", 'attachment; filename="solvencia.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Logo
    const logoPath = path.join(__dirname, "../../public/img/logopmt.png");
    if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 30, 40, { width: 60 });
    }

    // Encabezados
    doc
        .fontSize(14)
        .text("MUNICIPALIDAD DE SAN FELIPE", { align: "center", bold: true })
        .moveDown(0.5)
        .fontSize(14)
        .text("JUZGADO DE ASUNTOS MUNICIPALES DE TRANSITO", { align: "center", bold: true })
        .moveDown(2);

    // Fecha actual
      // Obtener fecha actual en formato deseado
      const fechaActual = new Date();
      const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
      const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);
  
      // Aplicarlo en el texto del PDF
      doc
          .fontSize(11)
          .text(
              `El juzgado de Asuntos Municipales de Tránsito del Municipio de San Felipe Retalhuleu hace constar que, de acuerdo con los registros correspondientes, el vehículo identificado con el número de placas de circulación ${placaCod.toUpperCase()} TIPO ${placaNombre.toUpperCase()} al ${fechaFormateada}.`,
              { align: "justify" }
          )
          .moveDown(2);

    // Sección de multas
    if (rows.length === 0) {
        doc
            .fontSize(11)
            .text("No tiene multas pendientes de pago en materia de tránsito, en base sobre la cual se le extiende la presente,", { align: "center" })
            .moveDown(2);

        // 🔹 **Mostrar "SOLVENCIA DE TRÁNSITO" solo si NO hay multas**
        doc
            .fontSize(12)
            .text("SOLVENCIA DE TRÁNSITO", { align: "center" })
            .moveDown(0.2);

        // Dibujar subrayado
        const textWidth = doc.widthOfString("SOLVENCIA DE TRÁNSITO");
        const textX = (doc.page.width - textWidth) / 2;
        const textY = doc.y;

        doc
            .moveTo(textX, textY)
            .lineTo(textX + textWidth, textY)
            .stroke();

        doc.moveDown(1);
    } else {
        // 🔹 Si hay multas, listarlas
        doc.fontSize(11).text("El vehículo tiene registradas las siguientes multas:", { align: "left" }).moveDown();

        rows.forEach((row, index) => {
            doc
            .fontSize(10)
            .text(`Multa No.${index + 1}`, { bold: true })
            .moveDown() // Salto de línea
            .text(`No. Boleta: ${row.no_boleta} | Placa Código: ${row.placa_cod} | Tipo Vehículo: ${row.tipo_vehiculo} | Artículo: ${row.numero_artic} | Detalle: ${row.detalle} | Estado: ${row.estado} | Precio: ${row.precio}`, { align: 'left' })
            .moveDown();
        });

        // 🔹 **NO mostrar "SOLVENCIA DE TRÁNSITO" ni su línea ni "Valor Q. 25.00" cuando hay multas**
    }

    // 🔹 **Mantener el resto del contenido SIEMPRE**
    doc
    .fontSize(11)
    .text(`San Felipe, ${fechaFormateada}`, { align: "right" })
    .moveDown(1);

    doc
        .fontSize(11)
        .text("Verificó: __________________", { align: "left" });

    if (rows.length === 0) {
        // 🔹 **Mostrar "Valor Q. 25.00" solo si NO hay multas**
        doc.text("Valor Q. 25.00", { align: "right" });
    }

    doc.moveDown(2);
    doc.text("Firma y Sello", { align: "right" });

    // Finalizar y enviar PDF
    doc.end();
}
