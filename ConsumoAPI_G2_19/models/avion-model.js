'use strict'

var conn = require("../config/db-connection"),
    AvionModel = () => {};

AvionModel.getAll = (cb) => conn.query("SELECT * FROM avion", cb);

AvionModel.getOne = (numero_avion ,cb) => 
    conn.query(
        "Select * From avion where numero_avion = $1", [numero_avion], cb);

AvionModel.post = (data, cb) => 
    conn.query("call public.sp_avion_insert ($1,$2,$3,$4,$5,$6,$7)",
    [
        data.numero_avion,
        data.tipo_avion,
        data.horas_vuelo,
        data.capacidad_pasajeros,
        data.fecha_primer_vuelo,
        data.pais_construccion,
        data.cantidad_vuelos
    ],cb);

AvionModel.put = (data, cb) => 
    conn.query("call public.sp_avion_update ($1,$2,$3,$4,$5,$6,$7)",
    [
        data.numero_avion,
        data.tipo_avion,
        data.horas_vuelo,
        data.capacidad_pasajeros,
        data.fecha_primer_vuelo,
        data.pais_construccion,
        data.cantidad_vuelos
    ],cb);

AvionModel.delete = (numero_avion ,cb) => conn.query("Select * From avion where numero_avion = $1", [numero_avion], cb);
AvionModel.delete = (numero_avion ,cb) => conn.query("call public.sp_avion_delete ($1)", [numero_avion], cb);

module.exports = AvionModel;