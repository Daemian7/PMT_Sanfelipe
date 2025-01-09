/*procedimientos almacenados*/

CREATE PROCEDURE sp_InsertUsuario
    @name_user NVARCHAR(400),
    @chapa INT
AS
BEGIN
    INSERT INTO Usuarios (name_user, chapa)
    VALUES (@name_user, @chapa);

    SELECT SCOPE_IDENTITY() AS NewUserId; -- Devuelve el ID del nuevo usuario
END;

CREATE PROCEDURE sp_GetUsuarios
AS
BEGIN
    SELECT Id_user, name_user, chapa
    FROM Usuarios;
END;

CREATE PROCEDURE sp_GetUsuarioById
    @Id_user INT
AS
BEGIN
    SELECT Id_user, name_user, chapa
    FROM Usuarios
    WHERE Id_user = @Id_user;
END;

CREATE PROCEDURE sp_UpdateUsuario
    @Id_user INT,
    @name_user NVARCHAR(400),
    @chapa INT
AS
BEGIN
    UPDATE Usuarios
    SET name_user = @name_user,
        chapa = @chapa
    WHERE Id_user = @Id_user;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� el usuario con el ID especificado.', 16, 1);
    END
END;

CREATE PROCEDURE sp_DeleteUsuario
    @Id_user INT
AS
BEGIN
    DELETE FROM Usuarios
    WHERE Id_user = @Id_user;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� el usuario con el ID especificado.', 16, 1);
    END
END;

--ejecutar usuarios 
EXEC sp_InsertUsuario @name_user = 'Berenice Chanchavac', @chapa = 38;
EXEC sp_InsertUsuario @name_user = 'Manuel Lopez', @chapa = 39;
EXEC sp_InsertUsuario @name_user = 'Maximo Perez', @chapa = 37;
EXEC sp_GetUsuarios;
EXEC sp_GetUsuarioById @Id_user = 1;
EXEC sp_UpdateUsuario @Id_user = 1, @name_user = 'Carlos L�pez', @chapa = 5678;
EXEC sp_DeleteUsuario @Id_user = 1;

use pmt_sanfe

CREATE PROCEDURE sp_InsertVehiculo
    @nombre NVARCHAR(200)
AS
BEGIN
    INSERT INTO vehiculos (nombre)
    VALUES (@nombre);

    SELECT SCOPE_IDENTITY() AS NewVehiculoId; -- Devuelve el ID del nuevo veh�culo
END;

CREATE PROCEDURE sp_GetVehiculos
AS
BEGIN
    SELECT id_vehiculo, nombre
    FROM vehiculos;
END;

CREATE PROCEDURE sp_GetVehiculoById
    @id_vehiculo INT
AS
BEGIN
    SELECT id_vehiculo, nombre
    FROM vehiculos
    WHERE id_vehiculo = @id_vehiculo;
END;

CREATE PROCEDURE sp_UpdateVehiculo
    @id_vehiculo INT,
    @nombre NVARCHAR(200)
AS
BEGIN
    UPDATE vehiculos
    SET nombre = @nombre
    WHERE id_vehiculo = @id_vehiculo;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� el veh�culo con el ID especificado.', 16, 1);
    END;
END;

CREATE PROCEDURE sp_DeleteVehiculo
    @id_vehiculo INT
AS
BEGIN
    DELETE FROM vehiculos
    WHERE id_vehiculo = @id_vehiculo;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� el veh�culo con el ID especificado.', 16, 1);
    END;
END;

--vehiculo
EXEC sp_InsertVehiculo @nombre = 'Moto';
EXEC sp_InsertVehiculo @nombre = 'Cabezal';
EXEC sp_InsertVehiculo @nombre = 'Camioneta';
EXEC sp_InsertVehiculo @nombre = 'Microbus';
EXEC sp_GetVehiculos;
EXEC sp_GetVehiculoById @id_vehiculo = 1;
EXEC sp_UpdateVehiculo @id_vehiculo = 1, @nombre = 'Honda Civic';
EXEC sp_DeleteVehiculo @id_vehiculo = 1;


CREATE PROCEDURE sp_InsertPlaca
    @placa NVARCHAR(250)
AS
BEGIN
    INSERT INTO placa (placa)
    VALUES (@placa);

    SELECT SCOPE_IDENTITY() AS NewPlacaId; -- Devuelve el ID de la nueva placa
END;

CREATE PROCEDURE sp_GetPlacas
AS
BEGIN
    SELECT id_placa, placa
    FROM placa;
END;

CREATE PROCEDURE sp_GetPlacaById
    @id_placa INT
AS
BEGIN
    SELECT id_placa, placa
    FROM placa
    WHERE id_placa = @id_placa;
END;

CREATE PROCEDURE sp_UpdatePlaca
    @id_placa INT,
    @placa NVARCHAR(250)
AS
BEGIN
    UPDATE placa
    SET placa = @placa
    WHERE id_placa = @id_placa;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� la placa con el ID especificado.', 16, 1);
    END;
END;

--placas
EXEC sp_InsertPlaca @placa = 'Transporte Urbano';
EXEC sp_InsertPlaca @placa = 'Trailer Comercial';
EXEC sp_InsertPlaca @placa = 'Distribuidor de vehiculos';
EXEC sp_GetPlacas;
EXEC sp_GetPlacaById @id_placa = 1;
EXEC sp_UpdatePlaca @id_placa = 1, @placa = 'XYZ9876';



CREATE PROCEDURE sp_InsertLicencia
    @tipo_licen NVARCHAR(100)
AS
BEGIN
    INSERT INTO licencia (tipo_licen)
    VALUES (@tipo_licen);

    SELECT SCOPE_IDENTITY() AS NewLicenciaId; -- Devuelve el ID de la nueva licencia
END;

CREATE PROCEDURE sp_GetLicencias
AS
BEGIN
    SELECT id_licen, tipo_licen
    FROM licencia;
END;

CREATE PROCEDURE sp_GetLicenciaById
    @id_licen INT
AS
BEGIN
    SELECT id_licen, tipo_licen
    FROM licencia
    WHERE id_licen = @id_licen;
END;

CREATE PROCEDURE sp_UpdateLicencia
    @id_licen INT,
    @tipo_licen NVARCHAR(100)
AS
BEGIN
    UPDATE licencia
    SET tipo_licen = @tipo_licen
    WHERE id_licen = @id_licen;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� la licencia con el ID especificado.', 16, 1);
    END;
END;

--licencia
EXEC sp_InsertLicencia @tipo_licen = 'Tipo E';
EXEC sp_InsertLicencia @tipo_licen = 'Tipo C';
EXEC sp_InsertLicencia @tipo_licen = 'Tipo M';
EXEC sp_GetLicencias;
EXEC sp_GetLicenciaById @id_licen = 1;
EXEC sp_UpdateLicencia @id_licen = 1, @tipo_licen = 'Tipo M';



CREATE PROCEDURE sp_InsertExtendida
    @ubicacion NVARCHAR(200)
AS
BEGIN
    INSERT INTO extendida (ubicacion)
    VALUES (@ubicacion);

    SELECT SCOPE_IDENTITY() AS NewExtendidaId; -- Devuelve el ID de la nueva entrada
END;

CREATE PROCEDURE sp_GetExtendidas
AS
BEGIN
    SELECT id_exten, ubicacion
    FROM extendida;
END;

CREATE PROCEDURE sp_GetExtendidaById
    @id_exten INT
AS
BEGIN
    SELECT id_exten, ubicacion
    FROM extendida
    WHERE id_exten = @id_exten;
END;

CREATE PROCEDURE sp_UpdateExtendida
    @id_exten INT,
    @ubicacion NVARCHAR(200)
AS
BEGIN
    UPDATE extendida
    SET ubicacion = @ubicacion
    WHERE id_exten = @id_exten;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� la entrada con el ID especificado.', 16, 1);
    END;
END;


EXEC sp_InsertExtendida @ubicacion = 'Villanueva';
EXEC sp_GetExtendidas;
EXEC sp_GetExtendidaById @id_exten = 1;
EXEC sp_UpdateExtendida @id_exten = 1, @ubicacion = 'Calle Ficticia 456';


CREATE PROCEDURE sp_InsertInfraccion
    @tipo_infrac NVARCHAR(150)
AS
BEGIN
    INSERT INTO infraccion (tipo_infrac)
    VALUES (@tipo_infrac);

    SELECT SCOPE_IDENTITY() AS NewInfraccionId; -- Devuelve el ID de la nueva infracci�n
END;

CREATE PROCEDURE sp_GetInfracciones
AS
BEGIN
    SELECT id_ifrac, tipo_infrac
    FROM infraccion;
END;

CREATE PROCEDURE sp_GetInfraccionById
    @id_ifrac INT
AS
BEGIN
    SELECT id_ifrac, tipo_infrac
    FROM infraccion
    WHERE id_ifrac = @id_ifrac;
END;

CREATE PROCEDURE sp_UpdateInfraccion
    @id_ifrac INT,
    @tipo_infrac NVARCHAR(150)
AS
BEGIN
    UPDATE infraccion
    SET tipo_infrac = @tipo_infrac
    WHERE id_ifrac = @id_ifrac;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� la infracci�n con el ID especificado.', 16, 1);
    END;
END;


--infraccion
EXEC sp_InsertInfraccion @tipo_infrac = 'Requerimiento de Pago';
EXEC sp_InsertInfraccion @tipo_infrac = 'Boleta Preventiva';
EXEC sp_InsertInfraccion @tipo_infrac = 'Anulada por Agente';
EXEC sp_GetInfracciones;
EXEC sp_GetInfraccionById @id_ifrac = 1;
EXEC sp_UpdateInfraccion @id_ifrac = 1, @tipo_infrac = 'Estacionamiento indebido';


CREATE PROCEDURE sp_InsertArticulo
    @numero_artic NVARCHAR(200),
    @detalle NVARCHAR(1200)
AS
BEGIN
    INSERT INTO articulos (numero_artic, detalle)
    VALUES (@numero_artic, @detalle);

    SELECT SCOPE_IDENTITY() AS NewArticuloId; -- Devuelve el ID del nuevo art�culo
END;

CREATE PROCEDURE sp_GetArticulos
AS
BEGIN
    SELECT id_artic, numero_artic, detalle
    FROM articulos;
END;

CREATE PROCEDURE sp_GetArticuloById
    @id_artic INT
AS
BEGIN
    SELECT id_artic, numero_artic, detalle
    FROM articulos
    WHERE id_artic = @id_artic;
END;

CREATE PROCEDURE sp_UpdateArticulo
    @id_artic INT,
    @numero_artic NVARCHAR(200),
    @detalle NVARCHAR(1200)
AS
BEGIN
    UPDATE articulos
    SET numero_artic = @numero_artic,
        detalle = @detalle
    WHERE id_artic = @id_artic;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR ('No se encontr� el art�culo con el ID especificado.', 16, 1);
    END;
END;


--articulos
EXEC sp_InsertArticulo @numero_artic = 'ART001', @detalle = 'Art�culo de prueba, descripci�n detallada';
EXEC sp_GetArticulos;
EXEC sp_GetArticuloById @id_artic = 1;
EXEC sp_UpdateArticulo @id_artic = 1, @numero_artic = 'ART002', @detalle = 'Nuevo detalle del art�culo';



CREATE PROCEDURE sp_InsertarFirma
    @tipo_firma NVARCHAR(350)
AS
BEGIN
    INSERT INTO firma (tipo_firma)
    VALUES (@tipo_firma);

    SELECT SCOPE_IDENTITY() AS id_firma; -- Devuelve el ID generado
END;


CREATE PROCEDURE sp_ObtenerFirmas
AS
BEGIN
    SELECT id_firma, tipo_firma
    FROM firma;
END;


CREATE PROCEDURE sp_ObtenerFirmaPorId
    @id_firma INT
AS
BEGIN
    SELECT id_firma, tipo_firma
    FROM firma
    WHERE id_firma = @id_firma;
END;


CREATE PROCEDURE sp_ActualizarFirma
    @id_firma INT,
    @tipo_firma NVARCHAR(350)
AS
BEGIN
    UPDATE firma
    SET tipo_firma = @tipo_firma
    WHERE id_firma = @id_firma;

    SELECT 'Registro actualizado correctamente' AS Mensaje;
END;



--firma
EXEC sp_InsertarFirma @tipo_firma = 'Firma Digital';
EXEC sp_ObtenerFirmas;
EXEC sp_ObtenerFirmaPorId @id_firma = 1;
EXEC sp_ActualizarFirma @id_firma = 1, @tipo_firma = 'Firma Electr�nica Actualizada';


CREATE PROCEDURE sp_InsertBoletaVehiculo
    @tipo_placa INT,
    @placa_cod NVARCHAR(8),
    @id_vehiculo INT,
    @nit_prop INT,
    @tarjeta_circ NVARCHAR(100),
    @marca NVARCHAR(100),
    @color NVARCHAR(100),
    @tipo_licencia INT,
    @no_licencia NVARCHAR(100),
    @no_doc_licencia NVARCHAR(100),
    @dpi NVARCHAR(13),
    @extendida INT,
    @nombre NVARCHAR(255)
AS
BEGIN
    INSERT INTO boleta_vehiculo (
        tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, marca, color,
        tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre
    )
    VALUES (
        @tipo_placa, @placa_cod, @id_vehiculo, @nit_prop, @tarjeta_circ, @marca, @color,
        @tipo_licencia, @no_licencia, @no_doc_licencia, @dpi, @extendida, @nombre
    );
END;

CREATE PROCEDURE sp_GetBoletaVehiculo
AS
BEGIN
    SELECT 
        id_boleta, tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, 
        marca, color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre
    FROM 
        boleta_vehiculo;
END;
GO

CREATE PROCEDURE sp_GetBoletaVehiculoById
    @id_boleta INT
AS
BEGIN
    SELECT 
        id_boleta, tipo_placa, placa_cod, id_vehiculo, nit_prop, tarjeta_circ, 
        marca, color, tipo_licencia, no_licencia, no_doc_licencia, dpi, extendida, nombre
    FROM 
        boleta_vehiculo
    WHERE 
        id_boleta = @id_boleta;
END;
GO

CREATE PROCEDURE sp_UpdateBoletaVehiculo
    @id_boleta INT,
    @tipo_placa INT,
    @placa_cod NVARCHAR(8),
    @id_vehiculo INT,
    @nit_prop INT,
    @tarjeta_circ NVARCHAR(100),
    @marca NVARCHAR(100),
    @color NVARCHAR(100),
    @tipo_licencia INT,
    @no_licencia NVARCHAR(100),
    @no_doc_licencia NVARCHAR(100),
    @dpi NVARCHAR(13),
    @extendida INT,
    @nombre NVARCHAR(255)
AS
BEGIN
    UPDATE boleta_vehiculo
    SET 
        tipo_placa = @tipo_placa,
        placa_cod = @placa_cod,
        id_vehiculo = @id_vehiculo,
        nit_prop = @nit_prop,
        tarjeta_circ = @tarjeta_circ,
        marca = @marca,
        color = @color,
        tipo_licencia = @tipo_licencia,
        no_licencia = @no_licencia,
        no_doc_licencia = @no_doc_licencia,
        dpi = @dpi,
        extendida = @extendida,
        nombre = @nombre
    WHERE 
        id_boleta = @id_boleta;
END;
GO


--boleta vehiculo 
EXEC sp_InsertBoletaVehiculo 
    @tipo_placa = 1, 
    @placa_cod = 'P176GAL', 
    @id_vehiculo = 2, 
    @nit_prop = 9794960, 
    @tarjeta_circ = '5193313', 
    @marca = 'Toyota', 
    @color = 'Rojo', 
    @tipo_licencia = 1, 
    @no_licencia = '1734539410901', 
    @no_doc_licencia = '8-0000345', 
    @dpi = '3330204351105', 
    @extendida = 1, 
    @nombre = 'Maria Prueba';
EXEC sp_GetBoletaVehiculo;
EXEC sp_GetBoletaVehiculoById @id_boleta = 1;
EXEC sp_UpdateBoletaVehiculo 
    @id_boleta = 1, 
    @tipo_placa = 2, 
    @placa_cod = 'DEF456', 
    @id_vehiculo = 3, 
    @nit_prop = 987654321, 
    @tarjeta_circ = '654321', 
    @marca = 'Honda', 
    @color = 'Azul', 
    @tipo_licencia = 2, 
    @no_licencia = '123456789', 
    @no_doc_licencia = '123456', 
    @dpi = '9876543210987', 
    @extendida = 4, 
    @nombre = 'Maria Lopez';




	CREATE PROCEDURE sp_InsertMulta
    @id_boleta INT,
    @total FLOAT
AS
BEGIN
    INSERT INTO multa (id_boleta, total)
    VALUES (@id_boleta, @total);
END;
GO

CREATE PROCEDURE sp_GetMultas
AS
BEGIN
    SELECT id_multa, id_boleta, total
    FROM multa;
END;
GO

CREATE PROCEDURE sp_GetMultaById
    @id_multa INT
AS
BEGIN
    SELECT id_multa, id_boleta, total
    FROM multa
    WHERE id_multa = @id_multa;
END;
GO

CREATE PROCEDURE sp_UpdateMulta
    @id_multa INT,
    @id_boleta INT,
    @total FLOAT
AS
BEGIN
    UPDATE multa
    SET id_boleta = @id_boleta,
        total = @total
    WHERE id_multa = @id_multa;
END;
GO


--multa
EXEC sp_InsertMulta @id_boleta = 1, @total = 250;
EXEC sp_GetMultas;
EXEC sp_GetMultaById @id_multa = 1;
EXEC sp_UpdateMulta @id_multa = 1, @id_boleta = 2, @total = 200.50;


CREATE PROCEDURE sp_InsertMultaDetalle
    @id_multa INT,
    @id_articulo INT,
    @sub_total FLOAT
AS
BEGIN
    INSERT INTO multa_detalle (id_multa, id_articulo, sub_total)
    VALUES (@id_multa, @id_articulo, @sub_total);
END;
GO

CREATE PROCEDURE sp_GetMultaDetalles
AS
BEGIN
    SELECT id_detalle, id_multa, id_articulo, sub_total
    FROM multa_detalle;
END;
GO

CREATE PROCEDURE sp_GetMultaDetalleById
    @id_detalle INT
AS
BEGIN
    SELECT id_detalle, id_multa, id_articulo, sub_total
    FROM multa_detalle
    WHERE id_detalle = @id_detalle;
END;
GO

CREATE PROCEDURE sp_UpdateMultaDetalle
    @id_detalle INT,
    @id_multa INT,
    @id_articulo INT,
    @sub_total FLOAT
AS
BEGIN
    UPDATE multa_detalle
    SET id_multa = @id_multa,
        id_articulo = @id_articulo,
        sub_total = @sub_total
    WHERE id_detalle = @id_detalle;
END;
GO

--multa detalle
EXEC sp_InsertMultaDetalle @id_multa = 1, @id_articulo = 2, @sub_total = 100.50;
EXEC sp_GetMultaDetalles;
EXEC sp_GetMultaDetalleById @id_detalle = 1;
EXEC sp_UpdateMultaDetalle @id_detalle = 1, @id_multa = 2, @id_articulo = 3, @sub_total = 150.75;




CREATE PROCEDURE sp_InsertInfoBoleta
    @ubicacion NVARCHAR(300),
    @fecha DATE,
    @hora TIME,
    @id_usuario INT,
    @observaciones NVARCHAR(500),
    @id_firma INT,
    @id_infrac INT
AS
BEGIN
    INSERT INTO info_boleta (ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac)
    VALUES (@ubicacion, @fecha, @hora, @id_usuario, @observaciones, @id_firma, @id_infrac);
END;
GO

CREATE PROCEDURE sp_GetInfoBoletas
AS
BEGIN
    SELECT id_info, ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac
    FROM info_boleta;
END;
GO

CREATE PROCEDURE sp_GetInfoBoletaById
    @id_info INT
AS
BEGIN
    SELECT id_info, ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac
    FROM info_boleta
    WHERE id_info = @id_info;
END;
GO

CREATE PROCEDURE sp_UpdateInfoBoleta
    @id_info INT,
    @ubicacion NVARCHAR(300),
    @fecha DATE,
    @hora TIME,
    @id_usuario INT,
    @observaciones NVARCHAR(500),
    @id_firma INT,
    @id_infrac INT
AS
BEGIN
    UPDATE info_boleta
    SET ubicacion = @ubicacion,
        fecha = @fecha,
        hora = @hora,
        id_usuario = @id_usuario,
        observaciones = @observaciones,
        id_firma = @id_firma,
        id_infrac = @id_infrac
    WHERE id_info = @id_info;
END;
GO


--info boleta
EXEC sp_InsertInfoBoleta 
@ubicacion = 'Entrada al palmarcito',
@fecha = '2025-01-01', 
@hora = '12:30:00', 
@id_usuario = 1, 
@observaciones = 'Observaciones sobre la boleta', 
@id_firma = 2, 
@id_infrac = 1;
EXEC sp_GetInfoBoletas;
EXEC sp_GetInfoBoletaById @id_info = 1;
EXEC sp_UpdateInfoBoleta @id_info = 1, @ubicacion = 'Alajuela', @fecha = '2025-01-02', @hora = '14:00:00', @id_usuario = 2, @observaciones = 'Nueva observaci�n', @id_firma = 2, @id_infrac = 3;





CREATE PROCEDURE sp_InsertarBoletaFinal
    @id_boleta INT,
    @id_info_boleta INT,
    @id_multa INT,
    @estado INT,
    @imagen VARBINARY(MAX) = NULL -- Opcional
AS
BEGIN
    INSERT INTO boleta_final (id_boleta, id_info_boleta, id_multa, estado, imagen)
    VALUES (@id_boleta, @id_info_boleta, @id_multa, @estado, @imagen);

    SELECT SCOPE_IDENTITY() AS id_boletafin; -- Devuelve el ID generado
END;


CREATE PROCEDURE sp_ObtenerBoletasFinales
AS
BEGIN
    SELECT id_boletafin, id_boleta, id_info_boleta, id_multa, estado, imagen
    FROM boleta_final;
END;


CREATE PROCEDURE sp_ObtenerBoletaFinalPorId
    @id_boletafin INT
AS
BEGIN
    SELECT id_boletafin, id_boleta, id_info_boleta, id_multa, estado, imagen
    FROM boleta_final
    WHERE id_boletafin = @id_boletafin;
END;


CREATE PROCEDURE sp_ActualizarBoletaFinal
    @id_boletafin INT,
    @id_boleta INT,
    @id_info_boleta INT,
    @id_multa INT,
    @estado INT,
    @imagen VARBINARY(MAX) = NULL -- Opcional
AS
BEGIN
    UPDATE boleta_final
    SET id_boleta = @id_boleta,
        id_info_boleta = @id_info_boleta,
        id_multa = @id_multa,
        estado = @estado,
        imagen = @imagen
    WHERE id_boletafin = @id_boletafin;

    SELECT 'Registro actualizado correctamente' AS Mensaje;
END;




-- boleta final
EXEC sp_InsertarBoletaFinal 
    @id_boleta = 1,
    @id_info_boleta = 2,
    @id_multa = 3,
    @estado = 1,
    @imagen = (SELECT * FROM OPENROWSET(BULK 'C:\ruta\a\imagen.jpg', SINGLE_BLOB) AS Imagen);
EXEC sp_ObtenerBoletasFinales;
EXEC sp_ObtenerBoletaFinalPorId @id_boletafin = 1;
EXEC sp_ActualizarBoletaFinal 
    @id_boletafin = 1,
    @id_boleta = 1,
    @id_info_boleta = 2,
    @id_multa = 3,
    @estado = 2,
    @imagen = (SELECT * FROM OPENROWSET(BULK 'C:\ruta\a\nueva_imagen.jpg', SINGLE_BLOB) AS Imagen);





CREATE PROCEDURE sp_InsertEstado
    @estado VARCHAR(10)
AS
BEGIN
    INSERT INTO estados (estado)
    VALUES (@estado);
END;

CREATE PROCEDURE sp_UpdateEstado
    @id_estado INT,
    @estado VARCHAR(10)
AS
BEGIN
    UPDATE estados
    SET estado = @estado
    WHERE id_estado = @id_estado;
END;
CREATE PROCEDURE sp_GetAllEstados
AS
BEGIN
    SELECT 
        id_estado,
        estado
    FROM estados;
END;

EXEC sp_InsertEstado 
    @estado = 'Inactivo';
EXEC sp_GetAllEstados;
EXEC sp_UpdateEstado 
    @id_estado = 1,
    @estado = 'Inactivo';



	use pmt_sanfe
	

SELECT 
    bv.id_boleta AS ID_Boleta,
    p.placa AS Tipo_Placa,
    bv.placa_cod AS Placa_Codigo,
    v.nombre AS Vehiculo_Nombre,
    bv.nit_prop AS NIT_Propietario,
    bv.tarjeta_circ AS Tarjeta_Circulacion,
    bv.marca AS Marca,
    bv.color AS Color,
    l.tipo_licen AS Tipo_Licencia,
    bv.no_licencia AS Numero_Licencia,
    bv.no_doc_licencia AS Documento_Licencia,
    bv.dpi AS DPI,
    e.ubicacion AS Licencia_Extendida,
    bv.nombre AS Propietario_Nombre
FROM 
    boleta_vehiculo bv
INNER JOIN 
    placa p ON bv.tipo_placa = p.id_placa
INNER JOIN 
    vehiculos v ON bv.id_vehiculo = v.id_vehiculo
INNER JOIN 
    licencia l ON bv.tipo_licencia = l.id_licen
INNER JOIN 
    extendida e ON bv.extendida = e.id_exten;

SELECT 
    ib.id_info AS ID_Info_Boleta,
    ib.ubicacion AS Ubicacion,
    ib.fecha AS Fecha,
    ib.hora AS Hora,
    u.name_user AS PMT,
    ib.observaciones AS Observaciones,
    f.tipo_firma AS Tipo_Firma,
    i.tipo_infrac AS Tipo_Infraccion
FROM 
    info_boleta ib
INNER JOIN 
    Usuarios u ON ib.id_usuario = u.Id_user
INNER JOIN 
    firma f ON ib.id_firma = f.id_firma
INNER JOIN 
    infraccion i ON ib.id_infrac = i.id_ifrac;


	INSERT INTO session_init (usuario, passw)
VALUES ('admin_user', 'userjemplo');



CREATE PROCEDURE CreateSession(
    @p_usuario VARCHAR(100),
    @p_passw VARCHAR(50)
)
AS
BEGIN
    INSERT INTO session_init (usuario, passw)
    VALUES (@p_usuario, @p_passw);
END;


CREATE PROCEDURE GetSession(
    @p_id_sess INT
)
AS
BEGIN
    SELECT id_sess, usuario, passw
    FROM session_init
    WHERE id_sess = @p_id_sess;
END;


CREATE PROCEDURE UpdateSession(
    @p_id_sess INT,
    @p_usuario VARCHAR(100),
    @p_passw VARCHAR(50)
)
AS
BEGIN
    UPDATE session_init
    SET usuario = @p_usuario, passw = @p_passw
    WHERE id_sess = @p_id_sess;
END;



EXEC CreateSession 'new_user', 'new_password';
EXEC GetSession 1;  -- Retrieve session with id_sess = 1
EXEC UpdateSession 1, 'updated_user', 'updated_password';

CREATE PROCEDURE sp_GetMultaTotalSubtotales
    @id_multa INT
AS
BEGIN
    SELECT SUM(sub_total) AS total_subtotales
    FROM multa_detalle
    WHERE id_multa = @id_multa;
END;
GO

use pmt_sanfe

CREATE PROCEDURE sp_UpdateMultaTotal
    @id_multa INT
AS
BEGIN
    -- Calcular la suma de subtotales
    DECLARE @total_subtotales FLOAT;
    SELECT @total_subtotales = SUM(sub_total)
    FROM multa_detalle
    WHERE id_multa = @id_multa;

    -- Actualizar el total en la tabla multa
    UPDATE multa
    SET total = @total_subtotales
    WHERE id_multa = @id_multa;
END;
GO
