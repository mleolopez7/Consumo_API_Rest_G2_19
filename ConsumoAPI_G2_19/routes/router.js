"use strict";


//ESTO ES UN EJEMPLO DE LAS RUTAS
var VueloController = require("../controllers/vuelo-controller"),
    PasajerosController = require("../controllers/pasajeros-controller"),
    AvionController = require("../controllers/avion-controller"),
    express = require("express"),
    router = express.Router();

router
  //****VUELO****
  .get("/vuelo/getall", VueloController.getAll)
  .post("/vuelo/getone/:codigo_vuelo", VueloController.getOne)
  .post("/vuelo/insertar/:codigo_vuelo", VueloController.post)
  .put("/vuelo/actualizar/:codigo_vuelo", VueloController.put)
  .delete("/vuelo/eliminar/:codigo_vuelo", VueloController.delete)

  //**** ENTIDADPASAJEROS *****/
  .get("/pasajeros/getall", PasajerosController.getAll)
  .post("/pasajeros/getone/:codigo_pasajero", PasajerosController.getOne)
  .post("/pasajeros/insert/:codigo_pasajero", PasajerosController.post)
  .put("/pasajero/update/:codigo_pasajero", PasajerosController.put)
  .delete("/pasajero/delete/:codigo_pasajero", PasajerosController.delete)
  
  //****AVION****
  .get("/avion/getall", AvionController.getAll)
  .post("/avion/getone/:numero_avion", AvionController.getOne)
  .post("/avion/insertar/:numero_avion", AvionController.post)
  .put("/avion/actualizar/:numero_avion", AvionController.put)
  .delete("/avion/eliminar/:numero_avion", AvionController.delete)

  .use(VueloController.error404)
  .use(PasajerosController.error404)
  .use(AvionController.error404)

module.exports = router;