'use strict'

//CONTROL GET ALL
var VueloModel = require('../models/vuelo-model'),
VueloController = () => {}

VueloController.getAll = (req, res, next) => {
    VueloModel.getAll((err, rows) => { 
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
                title : 'Lista de los Vuelos',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
    VueloModel.use = req
}

// CONTROL GET ONE
VueloController.getOne = (req, res, next) => {
    let codigo_vuelo = req.body.codigo_vuelo
    console.log(codigo_vuelo)

    VueloModel.getOne(codigo_vuelo, (err, rows) => {
        console.log(err, '---', rows)
        if (err)
        {
            let locals = {
                title :  `Error al buscar el registro con el id: ${codigo_vuelo}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.render('error', locals)
        }else{
            let locals = {
                title : 'Lista de Vuelos',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
}

//CONTROL INSERTAR
VueloController.post = (req, res, next) => {
    let vuelo = {
        codigo_vuelo : req.body.codigo_vuelo,
        ciudad_origen : req.body.ciudad_origen,
        ciudad_destino : req.body.ciudad_destino,
        fecha_vuelo : req.body.fecha_vuelo,
        cantidad_pasajeros : req.body.cantidad_pasajeros,
        tipo_avion : req.body.tipo_avion,
        distancia_km : req.body.distancia_km
    }
    console.log(vuelo)

    VueloModel.post(vuelo, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al guardar el registro con el id: ${vuelo.codigo_vuelo}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Vuelo se ha ingresado correctamente')
        }
    })
}

//CONTROL UPDATE
VueloController.put = (req, res, next) => {
    let vuelo = {
        codigo_vuelo : req.body.codigo_vuelo,
        ciudad_origen : req.body.ciudad_origen,
        ciudad_destino : req.body.ciudad_destino,
        fecha_vuelo : req.body.fecha_vuelo,
        cantidad_pasajeros : req.body.cantidad_pasajeros,
        tipo_avion : req.body.tipo_avion,
        distancia_km : req.body.distancia_km
    }
    console.log(vuelo)

    VueloModel.put(vuelo, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al actualizar el registro con el id: ${vuelo.codigo_vuelo}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Vuelo se ha actualizado correctamente')
        }
    })
}

//CONTROL DELETE
VueloController.delete = (req, res, next) => {
    let codigo_vuelo = req.body.codigo_vuelo;
    console.log(codigo_vuelo)

    VueloModel.delete(codigo_vuelo, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al eliminar el registro con el id: ${codigo_vuelo}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Vuelo se ha eliminado correctamente')
        }
    })
}


VueloController.addForm = (req, res, next) => res.render('add-vuelo', { title: 'Agregar Vuelo' })

VueloController.error404 = (req, res, next) => {
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

module.exports = VueloController;