create database pmt_sanfe
use pmt_sanfe

CREATE TABLE Usuarios (
    Id_user INT IDENTITY(1,1) PRIMARY KEY,  -- ID autoincremental
    name_user NVARCHAR(400) NOT NULL,     -- Nombre del usuario (máximo 100 caracteres)
    chapa int
);

ALTER TABLE Usuarios
DROP COLUMN passw;
ALTER TABLE Usuarios
DROP CONSTRAINT UQ__Usuarios__0FB803F82938B52F;

select 

select * from Usuarios

create table vehiculos(
id_vehiculo int identity (1,1) primary key,
nombre nvarchar(200)
);

create table placa (
id_placa int identity (1,1) primary key,
placa nvarchar(250)
);

alter table placa 
ALTER COLUMN placa nvarchar(250)not null;


create table licencia(
id_licen int identity (1,1) primary key,
tipo_licen nvarchar(100)
);


create table extendida(
id_exten int identity (1,1) primary key,
ubicacion nvarchar(200)
);


create table infraccion(
id_ifrac int identity (1,1) primary key,
tipo_infrac nvarchar(150)
);


create table articulos(
id_artic int identity (1,1) primary key,
numero_artic nvarchar(200),
detalle nvarchar(1200)
);


create table firma (
id_firma int identity (1,1) primary key,
tipo_firma nvarchar(350)
);
ALTER TABLE firma
DROP COLUMN Imagen;



CREATE TABLE boleta_vehiculo  (
   id_boleta INT IDENTITY(1,1) PRIMARY KEY,
    tipo_placa INT NOT NULL,
	placa_cod nvarchar(8),
	id_vehiculo int not null,
	nit_prop int not null,
	tarjeta_circ nvarchar(100),
	marca nvarchar(100),
	color nvarchar (100),
	tipo_licencia int not null,
	no_licencia nvarchar(100),
	no_doc_licencia nvarchar(100),
	dpi nvarchar(13),
	extendida int not null,
    nombre NVARCHAR(255) NOT NULL,
FOREIGN KEY (tipo_placa) REFERENCES placa(id_placa) ON DELETE CASCADE,
FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE CASCADE,
FOREIGN KEY (tipo_licencia) REFERENCES licencia(id_licen) ON DELETE CASCADE,
FOREIGN KEY (extendida) REFERENCES extendida(id_exten) ON DELETE CASCADE
);

create table multa (
id_multa int identity (1,1) primary key,
id_boleta int not null,
total float
foreign key (id_boleta) references boleta_vehiculo(id_boleta) on delete cascade
);

create table multa_detalle(
id_detalle int identity (1,1) primary key,
id_multa int not null,
id_articulo int not null,
sub_total float
foreign key (id_multa) references multa(id_multa) on delete cascade,
foreign key (id_articulo) references articulos(id_artic) on delete cascade
);

--ya lo cambie lol
--ALTER TABLE multa_detalle
--ADD CONSTRAINT fk_articulo
--FOREIGN KEY (id_articulo) REFERENCES articulos(id_artic)
--ON DELETE CASCADE;



create table info_boleta (
id_info int identity (1,1) primary key,
ubicacion nvarchar(300),
fecha date,
hora time,
id_usuario int not null,
observaciones nvarchar(500),
id_firma int not null,
id_infrac int not null
foreign key (id_usuario) references Usuarios(Id_user) on delete cascade,
foreign key (id_firma) references firma(id_firma) on delete cascade,
foreign key (id_infrac) references infraccion(id_ifrac) on delete cascade
);



create TABLE boleta_final (
    id_boletafin INT IDENTITY(1,1) PRIMARY KEY,
    id_boleta INT NOT NULL,
    id_info_boleta INT NOT NULL,
    id_multa INT NOT NULL,
    estado INT NOT NULL,
    CONSTRAINT FK_boleta_final_boleta_vehiculo FOREIGN KEY (id_boleta) 
        REFERENCES boleta_vehiculo(id_boleta) 
        ON DELETE NO ACTION,
    CONSTRAINT FK_boleta_final_info_boleta FOREIGN KEY (id_info_boleta) 
        REFERENCES info_boleta(id_info) 
        ON DELETE NO ACTION,
    CONSTRAINT FK_boleta_final_multa FOREIGN KEY (id_multa) 
        REFERENCES multa(id_multa) 
        ON DELETE NO ACTION,
constraint FK_estado_boleta foreign key(estado) references estados(id_estado) on delete no action
);

ALTER TABLE boleta_final
ADD imagen VARBINARY(MAX);

create table session_init (
id_sess int identity (1,1) primary key,
usuario varchar(100),
passw varchar(50)
);

create table estados(
id_estado int identity (1,1) primary key,
estado varchar(10)
);

