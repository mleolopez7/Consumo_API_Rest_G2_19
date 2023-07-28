'use strict'

//CONTROL GET ALL
var PasajerosModel = require('../models/pasajeros-model'),
PasajerosController = () => {}

PasajerosController.getAll = (req, res, next) => {
    PasajerosModel.getAll((err, rows) => { 
        if (err)
        {
            let locals = {
                title : 'Error al consultar la base de datos',
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.render('error', locals)
        }
        else
        {
            let locals = {
                title : 'Lista de los pasajeros',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
    PasajerosModel.use = req
}

// CONTROL GET ONE
PasajerosController.getOne = (req, res, next) => {
    let codigo_pasajero = req.body.codigo_pasajero
    console.log(codigo_pasajero)

    PasajerosModel.getOne(codigo_pasajero, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title :  `Error al buscar el registro con el id: ${codigo_pasajero}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.render('error', locals)
        }
        else
        {
            let locals = {
                title : 'Lista de pasajeros',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
}

//CONTROL INSERTAR
PasajerosController.post = (req, res, next) => {
    let pasajeros = {
      codigo_pasajero: req.body.codigo_pasajero,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      fecha_registro: req.body.fecha_registro,
      nacionalidad: req.body.nacionalidad,
      numero_telefono: req.body.numero_telefono,
      email: req.body.email,
    }
    console.log(pasajeros)

    PasajerosModel.post(pasajeros, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al guardar el registro con el id: ${pasajeros.codigo_pasajero}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else
        {
            res.send('El pasajero se ha ingresado correctamente')
        }
    })
}

//CONTROL UPDATE
PasajerosController.put = (req, res, next) => {
    let pasajeros = {
        codigo_pasajero: req.body.codigo_pasajero,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fecha_registro: req.body.fecha_registro,
        nacionalidad: req.body.nacionalidad,
        numero_telefono: req.body.numero_telefono,
        email: req.body.email
        }
     console.log(pasajeros)
     
    PasajerosModel.put(pasajeros, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al actualizar el registro con el id: ${pasajeros.codigo_pasajero}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El pasajero se ha actualizado correctamente')
        }
    })
}

//CONTROL DELETE
PasajerosController.delete = (req, res, next) => {
    let codigo_pasajero = req.body.codigo_pasajero;
    console.log(codigo_pasajero)

    PasajerosModel.delete(codigo_pasajero, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al eliminar el registro con el id: ${codigo_pasajero}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El pasajero se ha eliminado correctamente')
        }
    })
}


PasajerosController.addForm = (req, res, next) => res.render('add-pasajero', { title: 'Agregar pasajero' })

PasajerosController.error404 = (req, res, next) => {
    let error = new Error(),
    locals = {
        title : 'Error 404',
        description : 'Recurso no encontrado',
        error  : error
    }
    error.status = 404
    res.render('error', locals)
    next()
}

module.exports = PasajerosController;