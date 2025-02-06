const db = require("../db/db"); // Conexión a la BD
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


const buscarBoletas = async (req, res) => {
    // Obtener los parámetros desde query (req.query)
    const { tipo, valor } = req.query;

    // Verificar si los parámetros están presentes
    if (!tipo || !valor) {
        return res.status(400).json({ error: "Faltan parámetros de búsqueda" });
    }

    let query = `
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
            SUM(a.precio) AS total_precio
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
    `;

    // Dependiendo del tipo, agregamos la cláusula WHERE
    if (tipo === "DPI") {
        query += ` WHERE BV.dpi = ?`;
    } else if (tipo === "Nombre") {
        query += ` WHERE BV.nombre = ?`;
    } else if (tipo === "Licencia") {
        query += ` WHERE BV.no_licencia = ?`;
    } else {
        return res.status(400).json({ error: "Tipo de búsqueda no válido" });
    }

    // Añadir GROUP BY después de WHERE para realizar la agregación
    query += `
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
            es.estado
    `;

    // Ejecutar la consulta en la base de datos
    db.query(query, [valor], (err, rows) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error al realizar la búsqueda" });
        }

        // Si no se encontraron resultados
        if (rows.length === 0) {
            return res.status(404).json({ message: "No existen multas registradas para los criterios proporcionados" });
        }

        res.json(rows); // Devolver los resultados
    });
};


const generarPDF = async (req, res) => {
    try {
        const { tipo, valor } = req.query;
        const fechaActual = new Date().toLocaleDateString("es-ES");
        const tempPath = path.join(__dirname, "../../temp");

        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath, { recursive: true });
        }

        // Verificar que los parámetros están presentes
        if (!tipo || !valor) {
            return res.status(400).json({ error: "Faltan parámetros de búsqueda" });
        }

        let query = `
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
        `;

        let condition = "";
        let params = [];

        // Construir la cláusula WHERE en función del tipo
        if (tipo === "DPI") {
            condition = ` WHERE BV.dpi = ?`;
        } else if (tipo === "Nombre") {
            condition = ` WHERE BV.nombre = ?`;
        } else if (tipo === "Licencia") {
            condition = ` WHERE BV.no_licencia = ?`;
        } else {
            return res.status(400).json({ error: "Tipo de búsqueda no válido" });
        }

        query += condition;
        params.push(valor);

        db.query(query, params, async (err, rows) => {
            if (err) {
                console.error("Error generando PDF:", err);
                return res.status(500).json({ error: "Error generando el PDF" });
            }

            const pdfPath = path.join(tempPath, "solvencia_transito.pdf");
            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(pdfPath);
            doc.pipe(stream);

            // Agregar logo
            const logoPath = path.join(__dirname, "../../public/img/logopmt.png");
            if (fs.existsSync(logoPath)) {
                doc.image(logoPath, 50, 40, { width: 50 });
            }

            // Encabezado
            doc.font("Helvetica-Bold").fontSize(14).text("MUNICIPALIDAD DE SAN FELIPE", { align: "center" })
                .moveDown(0.3)
                .fontSize(12).text("JUZGADO DE ASUNTOS MUNICIPALES DE TRANSITO", { align: "center" })
                .moveDown(1);

 // Obtener fecha actual en formato deseado
 const fechaActual = new Date();
 const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
 const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);

            // Cuerpo del documento
            doc.font("Helvetica").fontSize(11)
                .text(`El juzgado de Asuntos Municipales de Tránsito del Municipio de San Felipe Retalhuleu hace constar que, de acuerdo con los registros correspondientes, el conductor identificado con el ${tipo} ${valor} al ${fechaFormateada}.`, { align: "justify" })
                .moveDown(1);

            if (rows.length === 0) {
                // Si NO hay multas, mostrar solvencia
                doc.font("Helvetica-Bold").text("No tiene multas pendientes de pago en materia de tránsito, base sobre la cual se le extiende la presente,", { align: "center" }).moveDown(1);
                doc.font("Helvetica-Bold").text("SOLVENCIA DE TRANSITO", { align: "center", underline: true }).moveDown(1);
            } else {
                // Si hay multas, listarlas
                doc.font("Helvetica-Bold").text("Cuenta con las siguientes multas registradas:", { underline: true }).moveDown(0.5);

                rows.forEach(boleta => {
                    doc.font("Helvetica").text(`No. Boleta: ${boleta.no_boleta} - Placa: ${boleta.placa_cod} - Tipo Vehículo: ${boleta.tipo_vehiculo} - Estado: ${boleta.estado}`).moveDown(0.3);
                    doc.font("Helvetica").text(`Artículo No: ${boleta.numero_artic} - Detalle: ${boleta.detalle} - Monto: Q${boleta.precio.toFixed(2)}`).moveDown(0.5);
                });
            }

            // Pie de página
            doc.moveDown(2)
                .font("Helvetica-Bold").text("Verificó: ____________________", { align: "left" })
                .text(`San Felipe, ${fechaFormateada}`, { align: "right" })
                .text("Firma y Sello", { align: "right" });

            // Agregar el "Valor Q. 25.00" SOLO si no hay multas
            if (rows.length === 0) { 
                doc.text("Valor Q. 25.00", { align: "right" });
            }

            doc.end();

            stream.on("finish", () => {
                res.download(pdfPath, "solvencia_transito.pdf", (err) => {
                    if (!err) {
                        fs.unlinkSync(pdfPath);
                    }
                });
            });
        });
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        res.status(500).json({ error: "Error al generar el PDF" });
    }
};


module.exports = { buscarBoletas, generarPDF };