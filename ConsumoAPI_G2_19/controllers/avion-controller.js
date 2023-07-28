'use strict'

//CONTROL GET ALL
var AvionModel = require('../models/avion-model'),
AvionController = () => {}

AvionController.getAll = (req, res, next) => {
    AvionModel.getAll((err, rows) => { 
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
                title : 'Lista de los Aviones',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
    AvionModel.use = req
}

// CONTROL GET ONE
AvionController.getOne = (req, res, next) => {
    let numero_avion = req.body.numero_avion
    console.log(numero_avion)

    AvionModel.getOne(numero_avion, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title :  `Error al buscar el registro con el id: ${numero_avion}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.render('error', locals)
        }else{
            let locals = {
                title : 'Lista de Aviones',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
}

//CONTROL INSERTAR
AvionController.post = (req, res, next) => {
    let avion = {
        numero_avion : req.body.numero_avion,
        tipo_avion : req.body.tipo_avion,
        horas_vuelo : req.body.horas_vuelo,
        capacidad_pasajeros : req.body.capacidad_pasajeros,
        fecha_primer_vuelo : req.body.fecha_primer_vuelo,
        pais_construccion : req.body.pais_construccion,
        cantidad_vuelos : req.body.cantidad_vuelos
    }
    console.log(avion)

    AvionModel.post(avion, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al guardar el registro con el id: ${avion.numero_avion}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Avion se ha ingresado correctamente')
        }
    })
}

//CONTROL UPDATE
AvionController.put = (req, res, next) => {
    let avion = {
        numero_avion : req.body.numero_avion,
        tipo_avion : req.body.tipo_avion,
        horas_vuelo : req.body.horas_vuelo,
        capacidad_pasajeros : req.body.capacidad_pasajeros,
        fecha_primer_vuelo : req.body.fecha_primer_vuelo,
        pais_construccion : req.body.pais_construccion,
        cantidad_vuelos : req.body.cantidad_vuelos
    }
    console.log(avion)

    AvionModel.put(avion, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al actualizar el registro con el id: ${avion.numero_avion}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Avion se ha actualizado correctamente')
        }
    })
}

//CONTROL DELETE
AvionController.delete = (req, res, next) => {
    let numero_avion = req.body.numero_avion;
    console.log(numero_avion)

    AvionModel.delete(numero_avion, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al eliminar el registro con el id: ${numero_avion}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Avion se ha eliminado correctamente')
        }
    })
}


AvionController.addForm = (req, res, next) => res.render('add-avion', { title: 'Agregar Avion' })

AvionController.error404 = (req, res, next) => {
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

module.exports = AvionController;