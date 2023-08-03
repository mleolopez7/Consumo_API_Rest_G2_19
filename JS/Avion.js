var UrlApiGetAllAviones = "http://localhost:5002/avion/getall";
var UrlApiGetUnoAvion ="http://localhost:5002/avion/getone/:numero_avion";
var UrlApiInsertAvion = "http://localhost:5002/avion/insertar/:numero_avion";
var UrlApiActualizarAvion = "http://localhost:5002/avion/actualizar/:numero_avion/";
var UrlApiEliminarAvion ="http://localhost:5002/avion/eliminar/:numero_avion";

$(document).ready(function () {
  CargarAviones();
});

function CargarAviones() {
  $.ajax({
    url: UrlApiGetAllAviones,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      var MisAviones = response;
      var Aviones = "";
      for (i = 0; i < MisAviones.length; i++) {
        Aviones +=
          "<tr>" +
          "<td>" +
          MisAviones[i].numero_avion +
          "</td>" +
          "<td>" +
          MisAviones[i].tipo_avion +
          "</td>" +
          "<td>" +
          MisAviones[i].horas_vuelo +
          "</td>" +
          "<td>" +
          MisAviones[i].capacidad_pasajeros +
          "</td>" +
          "<td>" +
          MisAviones[i].fecha_primer_vuelo +
          "</td>" +
          "<td>" +
          MisAviones[i].pais_construccion +
          "</td>" +
          "<td>" +
          MisAviones[i].cantidad_vuelos +
          "</td>" +
          '<td><input type="button" onclick="CargarAvion(' +
          MisAviones[i].numero_avion +
          ')" id="btnEditarAvion" class="btn btn-success" value="Editar"></td>' +
          '<td><input type="button" onclick="EliminarAvion(' +
          MisAviones[i].numero_avion +
          ')" id="btnEliminarAvion" class="btn btn-danger" value="Eliminar"></td>' +
          "</tr>";
        $("#DataAviones").html(Aviones);
      }
    },
  });
}

function CargarAvion(P_numero_avion) {
  var datosAvion = {
    numero_avion: P_numero_avion,
  };
  var datosAvionJson = JSON.stringify(datosAvion);

  $.ajax({
    url: UrlApiGetUnoAvion,
    type: "POST",
    data: datosAvionJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      var MisAviones = response;
      for (let i = 0; i < MisAviones.length; i++) {
        $("#numero_avion").val(MisAviones[i].numero_avion);
        $("#tipo_avion").val(MisAviones[i].tipo_avion);
        $("#horas_vuelo").val(MisAviones[i].horas_vuelo);
        $("#capacidad_pasajeros").val(MisAviones[i].capacidad_pasajeros);
        $("#fecha_primer_vuelo").val(MisAviones[i].fecha_primer_vuelo);
        $("#pais_construccion").val(MisAviones[i].pais_construccion);
        $("#cantidad_vuelos").val(MisAviones[i].cantidad_vuelos);
        var btnActualizar =
          '<input type="button" onclick="ActualizarAvion(' +
          MisAviones[i].numero_avion +
          ')" id="btnActualizarAvion" class="btn btn-primary" value="Actualizar Avion"></input>';
        $("#btnAgregarAviones").html(btnActualizar);
      }
    },
  });
}

function AgregarAvion() {
  var datosAvion = {
    numero_avion: $("#numero_avion").val(),
    tipo_avion: $("#tipo_avion").val(),
    horas_vuelo: $("#horas_vuelo").val(),
    capacidad_pasajeros: $("#capacidad_pasajeros").val(),
    fecha_primer_vuelo: $("#fecha_primer_vuelo").val(),
    pais_construccion: $("#pais_construccion").val(),
    cantidad_vuelos: $("#cantidad_vuelos").val(),
  };

  var datosAvionJson = JSON.stringify(datosAvion);

  $.ajax({
    url: UrlApiInsertAvion,
    type: "POST",
    data: datosAvionJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      alert("---Avion Ingresado Exitosamente---");
      $("#FormularioAviones").submit();
    },
    error: function (textError, errorThrown) {
      alert("Error: " + textError + errorThrown);
    },
  });
}

function ActualizarAvion() {
  var datosAvion = {
    numero_avion: $("#numero_avion").val(),
    tipo_avion: $("#tipo_avion").val(),
    horas_vuelo: $("#horas_vuelo").val(),
    capacidad_pasajeros: $("#capacidad_pasajeros").val(),
    fecha_primer_vuelo: $("#fecha_primer_vuelo").val(),
    pais_construccion: $("#pais_construccion").val(),
    cantidad_vuelos: $("#cantidad_vuelos").val(),
  };

  var datosAvionJson = JSON.stringify(datosAvion);

  $.ajax({
    url: UrlApiActualizarAvion,
    type: "PUT",
    data: datosAvionJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      alert("---Avion ha sido Actualizado Exitosamente---");
      $("#FormularioAviones").submit();
    },
    error: function (textError, errorThrown) {
      alert("Error: " + textError + errorThrown);
    },
  });
}

function EliminarAvion(P_numero_avion) {
  var datosAvion = {
    numero_avion: P_numero_avion,
  };
  var datosAvionJson = JSON.stringify(datosAvion);

  $.ajax({
    url: UrlApiEliminarAvion,
    type: "DELETE",
    data: datosAvionJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      var MisAviones = response;
      alert(response);
      CargarAviones();
    },
  });
}
