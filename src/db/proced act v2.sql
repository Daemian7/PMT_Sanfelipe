select * from boleta_vehiculo

SELECT MAX(id_boleta) AS id_boleta FROM boleta_vehiculo

SELECT MAX(id_boleta) AS id_boleta FROM boleta_vehiculo


select * from info_boleta


CREATE PROCEDURE addinfoboleta
    @ubicacion NVARCHAR(300),
    @fecha DATE,
    @hora TIME,
    @id_usuario INT,
    @observaciones NVARCHAR(500),
    @id_firma INT,
    @id_infrac INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    DECLARE @ultimoIdBoleta INT;

    -- Obtener el último ID de boleta_vehiculo
    SELECT @ultimoIdBoleta = MAX(id_boleta)
    FROM boleta_vehiculo;

    -- Verificar si el id_firma existe en la tabla firma
    IF EXISTS (SELECT 1 FROM firma WHERE id_firma = @id_firma)
    BEGIN
        -- Insertar en info_boleta
        INSERT INTO info_boleta (id_boleta, ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac)
        VALUES (@ultimoIdBoleta, @ubicacion, @fecha, @hora, @id_usuario, @observaciones, @id_firma, @id_infrac);
    END
    ELSE
    BEGIN
        RAISERROR('El valor de id_firma no existe en la tabla firma.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    COMMIT TRANSACTION;
END;


EXEC addinfoboleta 'Ubicación de la infracción', '2023-11-24', '13:30:00', 1, 'Observaciones sobre la infracción', 1, 1;

 DECLARE @ultimoIdBoleta INT;

    -- Obtener el último ID de boleta_vehiculo
    SELECT @ultimoIdBoleta = MAX(id_boleta)
    FROM boleta_vehiculo;

	DECLARE @ultimoIdBoleta INT;

SELECT @ultimoIdBoleta = MAX(id_boleta)
FROM boleta_vehiculo;

SELECT @ultimoIdBoleta AS UltimoID;

SET @UltimoID = NULL;


DECLARE @UltimoID INT;
SET @UltimoID = SCOPE_IDENTITY();
PRINT @UltimoID;


DECLARE @Ultimo INT;
SET @Ultimo = SCOPE_IDENTITY();  -- O asigna manualmente: SET @UltimoID = 10
PRINT 'El último ID registrado es: ' + CAST(@Ultimo AS VARCHAR);

select @Ultimo as Ultimo


DECLARE @UlID INT;

-- Obtener el último ID registrado en la tabla
SELECT @UlID = MAX(id_boleta) FROM boleta_vehiculo;

-- Mostrarlo en pantalla
PRINT 'El último ID registrado es: ' + CAST(@UlID AS VARCHAR);
SELECT @UlID AS UltimoID;


CREATE PROCEDURE sp_AddInfoBoleta
    @ubicacion NVARCHAR(300),
    @fecha DATE,
    @hora TIME,
    @id_usuario INT,
    @observaciones NVARCHAR(500),
    @id_firma INT,
    @id_infrac INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UltimoID INT;

    -- Obtener el último ID registrado en la tabla boleta_vehiculo
    SELECT @UltimoID = MAX(id_boleta) FROM boleta_vehiculo;

    -- Insertar los datos en info_boleta usando @UltimoID para id_boleta
    INSERT INTO info_boleta (ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac, id_boleta)
    VALUES (@ubicacion, @fecha, @hora, @id_usuario, @observaciones, @id_firma, @id_infrac, @UltimoID);
    
    -- Opcional: Devolver el ID insertado
    SELECT SCOPE_IDENTITY() AS NuevoID;
END;


EXEC sp_AddInfoBoleta 
    @ubicacion = 'Centro Ciudad',
    @fecha = '2025-01-29',
    @hora = '12:30:00',
    @id_usuario = 1,
    @observaciones = 'Ejemplo de observación',
    @id_firma = 2,
    @id_infrac = 3;


	select * from info_boleta


	drop PROCEDURE sp_AddMulta
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UlID INT;

    -- Obtener el último ID registrado en la tabla boleta_vehiculo
    SELECT @UlID = MAX(id_boleta) FROM boleta_vehiculo;

    -- Insertar en la tabla multa con total = 0
    INSERT INTO multa (id_boleta, total)
    VALUES (@UlID, 0);

    -- Retornar el ID de la multa recién insertada
    SELECT SCOPE_IDENTITY() AS NuevoID;
END;


EXEC sp_AddMulta;




DECLARE @UlmID INT;

-- Obtener el último ID registrado en la tabla
SELECT @UlmID = MAX(id_multa) FROM multa;

-- Mostrarlo en pantalla
PRINT 'El último ID registrado es: ' + CAST(@UlmID AS VARCHAR);
SELECT @UlmID AS UltimoID;


select * from multa



CREATE PROCEDURE sp_AddMultaDetalle
    @id_articulo INT
AS
BEGIN
    DECLARE @UlmID INT;

    -- Obtener el último ID registrado en la tabla multa
    SELECT @UlmID = MAX(id_multa) FROM multa;

    -- Validar si se obtuvo un ID válido
    IF @UlmID IS NULL
    BEGIN
        PRINT 'Error: No hay registros en la tabla multa.';
        RETURN;
    END

    -- Insertar el nuevo detalle en la tabla multa_detalle
    INSERT INTO multa_detalle (id_multa, id_articulo)
    VALUES (@UlmID, @id_articulo);

    -- Confirmar la inserción
    PRINT 'Registro insertado en multa_detalle con id_multa: ' + CAST(@UlmID AS VARCHAR);
END;


EXEC sp_AddMultaDetalle @id_articulo = 5;


SELECT MAX(id_multa) AS id_multa FROM multa



--este es el procedimiento bueno 
CREATE PROCEDURE sp_AddMulta
    @total DECIMAL(10,2)  -- Permite insertar el total manualmente
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UlID INT;

    -- Obtener el último ID registrado en la tabla boleta_vehiculo
    SELECT @UlID = MAX(id_boleta) FROM boleta_vehiculo;

    -- Validar si hay un ID disponible
    IF @UlID IS NULL
    BEGIN
        PRINT 'Error: No hay registros en la tabla boleta_vehiculo.';
        RETURN;
    END

    -- Insertar en la tabla multa con el total proporcionado
    INSERT INTO multa (id_boleta, total)
    VALUES (@UlID, @total);

    -- Retornar el ID de la multa recién insertada
    SELECT SCOPE_IDENTITY() AS NuevoID;
END;


EXEC sp_AddMulta @total = 200


select * from info_boleta


DECLARE @UlmID INT;

-- Obtener el último ID registrado en la tabla
SELECT @UlmID = MAX(id_info) FROM info_boleta;

-- Mostrarlo en pantalla
PRINT 'El último ID registrado es: ' + CAST(@UlmID AS VARCHAR);
SELECT @UlmID AS UltimoID;


select * from estados



CREATE PROCEDURE sp_InsertBoletaFinal
    @Vencimiento DATE -- Agregar parámetro de fecha de vencimiento
AS
BEGIN
    DECLARE @UltimoIDBoleta INT;
    DECLARE @UltimoIDInfoBoleta INT;
    DECLARE @UltimoIDMulta INT;
    DECLARE @Estado INT = 1;

    -- Obtener el último ID registrado en cada tabla
    SELECT @UltimoIDBoleta = MAX(id_boleta) FROM boleta_vehiculo;
    SELECT @UltimoIDInfoBoleta = MAX(id_info) FROM info_boleta;
    SELECT @UltimoIDMulta = MAX(id_multa) FROM multa;
    
    -- Insertar en la tabla boleta_final con la fecha de vencimiento proporcionada
    INSERT INTO boleta_final (id_boleta, id_info_boleta, id_multa, estado, vencimiento)
    VALUES (@UltimoIDBoleta, @UltimoIDInfoBoleta, @UltimoIDMulta, @Estado, @Vencimiento);
END;

EXEC sp_InsertBoletaFinal @Vencimiento = '2025-03-01';


select * from boleta_final

select * from boleta_vehiculo

select * from licencia

SELECT 
BV.no_boleta, p.placa_inicial, BV.placa_cod, v.nombre, BV.nit_prop, bv.tarjeta_circ, bv.marca, bv.color, l.tipo_licen, bv.no_licencia, bv.no_doc_licencia,
bv.dpi, e.ubicacion, bv.nombre, es.estado
FROM boleta_vehiculo BV
INNER JOIN placa p ON p.id_placa = BV.tipo_placa
inner join vehiculos v on v.id_vehiculo = BV.id_vehiculo
inner join extendida e on e.id_exten = BV.extendida
inner join boleta_final bf on bf.id_boleta = BV.id_boleta
inner join estados es on es.id_estado = bf.estado
inner join licencia l on l.id_licen = BV.tipo_licencia


drop PROCEDURE sp_GetBoletas
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        BV.no_boleta, 
        p.placa_inicial, 
        BV.placa_cod, 
        v.nombre, 
        BV.nit_prop, 
        BV.tarjeta_circ, 
        BV.marca, 
        BV.color, 
        BV.no_licencia, 
        BV.no_doc_licencia,
        BV.dpi, 
        e.ubicacion, 
        BV.nombre, 
        es.estado
    FROM boleta_vehiculo BV
    INNER JOIN placa p ON p.id_placa = BV.tipo_placa
    INNER JOIN vehiculos v ON v.id_vehiculo = BV.id_vehiculo
    INNER JOIN extendida e ON e.id_exten = BV.extendida
    INNER JOIN boleta_final bf ON bf.id_boleta = BV.id_boleta
    INNER JOIN estados es ON es.id_estado = bf.estado;
END;

EXEC sp_GetBoletas;



create PROCEDURE sp_GetBoletas
AS
BEGIN
    SET NOCOUNT ON;

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
        BV.nombre , 
        es.estado,
	
    FROM boleta_vehiculo BV
    INNER JOIN placa p ON p.id_placa = BV.tipo_placa
    INNER JOIN vehiculos v ON v.id_vehiculo = BV.id_vehiculo
    INNER JOIN extendida e ON e.id_exten = BV.extendida
    INNER JOIN boleta_final bf ON bf.id_boleta = BV.id_boleta
    INNER JOIN estados es ON es.id_estado = bf.estado
    INNER JOIN licencia l ON l.id_licen = BV.tipo_licencia;

END;

UPDATE boleta_final SET estado = SELECT id_estado FROM estados WHERE estado = 1  WHERE id_boleta = 23

UPDATE boleta_final
SET estado = 2
WHERE id_boleta = 23;

select * from boleta_final

select * from estados

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
    es.estado
FROM boleta_vehiculo BV
INNER JOIN placa p ON p.id_placa = BV.tipo_placa
INNER JOIN vehiculos v ON v.id_vehiculo = BV.id_vehiculo
INNER JOIN extendida e ON e.id_exten = BV.extendida
INNER JOIN boleta_final bf ON bf.id_boleta = BV.id_boleta
INNER JOIN estados es ON es.id_estado = bf.estado
INNER JOIN licencia l ON l.id_licen = BV.tipo_licencia
WHERE p.id_placa = 1 
AND BV.placa_cod = '123ABC'
and es.id_estado = 1;



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
	m.total, -- Sumar el total de multas
    ib.fecha -- Obtener la fecha más reciente
FROM boleta_vehiculo BV
INNER JOIN placa p ON p.id_placa = BV.tipo_placa
INNER JOIN vehiculos v ON v.id_vehiculo = BV.id_vehiculo
INNER JOIN extendida e ON e.id_exten = BV.extendida
INNER JOIN boleta_final bf ON bf.id_boleta = BV.id_boleta
INNER JOIN estados es ON es.id_estado = bf.estado
INNER JOIN licencia l ON l.id_licen = BV.tipo_licencia
INNER JOIN multa m ON m.id_boleta = BV.id_boleta
INNER JOIN info_boleta ib ON ib.id_boleta = BV.id_boleta
WHERE p.id_placa = 1 
AND BV.placa_cod = '123ABC'
AND es.id_estado = 1
GROUP BY 
    BV.no_boleta, p.placa_inicial, BV.placa_cod, v.nombre, 
    BV.nit_prop, BV.tarjeta_circ, BV.marca, BV.color, 
    l.tipo_licen, BV.no_licencia, BV.no_doc_licencia, BV.dpi, 
    e.ubicacion, BV.nombre, es.estado;
