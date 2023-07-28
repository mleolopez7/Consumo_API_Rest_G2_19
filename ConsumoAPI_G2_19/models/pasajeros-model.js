'use strict'

var conn = require("../config/db-connection"),
    PasajerosModel = () => {};

PasajerosModel.getAll = (cb) => conn.query("SELECT * FROM pasajeros", cb);

PasajerosModel.getOne = (codigo_pasajero ,cb) => 
    conn.query(
        "Select * From pasajeros where codigo_pasajero = $1", [codigo_pasajero], cb);

PasajerosModel.post = (data, cb) =>
  conn.query(
    "call public.sp_pasajeros_insert ($1,$2,$3,$4,$5,$6,$7)",
    [
      data.codigo_pasajero,
      data.nombres,
      data.apellidos,
      data.fecha_registro,
      data.nacionalidad,
      data.numero_telefono,
      data.email
    ],
    cb);

PasajerosModel.put = (data, cb) =>
  conn.query(
    "call public.sp_pasajeros_update ($1,$2,$3,$4,$5,$6,$7)",
    [
      data.codigo_pasajero,
      data.nombres,
      data.apellidos,
      data.fecha_registro,
      data.nacionalidad,
      data.numero_telefono,
      data.email,
    ],
    cb );

PasajerosModel.delete = (codigo_pasajero ,cb) => conn.query("Select * From pasajeros where codigo_pasajero = $1", [codigo_pasajero], cb);
PasajerosModel.delete = (codigo_pasajero ,cb) => conn.query("call public.sp_pasajeros_delete ($1)", [codigo_pasajero], cb);

module.exports = PasajerosModel;