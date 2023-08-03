var UrlApiGetAll = "http://localhost:5002/pasajeros/getall";
var UrlApiGetUno = "http://localhost:5002/pasajeros/getone/:codigo_pasajero";
var UrlApiInsert = "http://localhost:5002/pasajeros/insert/:codigo_pasajero";
var UrlApiActualizar ="http://localhost:5002/pasajero/update/:codigo_pasajero";
var UrlApiEliminar = "http://localhost:5002/pasajero/delete/:codigo_pasajero";

$(document).ready(function () {
  CargarPasajeros();
});

function CargarPasajeros() {
  $.ajax({
    url: UrlApiGetAll,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      var MisPasajeros = response;
      var Pasajeros = "";
      for (i = 0; i < MisPasajeros.length; i++) {
        Pasajeros +=
          "<tr>" +
          "<td>" +
          MisPasajeros[i].codigo_pasajero +
          "</td>" +
          "<td>" +
          MisPasajeros[i].nombres +
          "</td>" +
          "<td>" +
          MisPasajeros[i].apellidos +
          "</td>" +
          "<td>" +
          MisPasajeros[i].fecha_registro +
          "</td>" +
          "<td>" +
          MisPasajeros[i].nacionalidad +
          "</td>" +
          "<td>" +
          MisPasajeros[i].numero_telefono +
          "</td>" +
          "<td>" +
          MisPasajeros[i].email +
          "</td>" +
          '<td><input type="button" onclick="CargarPasajero(' +
          MisPasajeros[i].codigo_pasajero +
          ')" id="btnEditarPasajero" class="btn btn-success" value="Editar"></td>' +
          '<td><input type="button" onclick="EliminarPasajero(' +
          MisPasajeros[i].codigo_pasajero +
          ')" id="btnEliminarPasajero" class="btn btn-danger" value="Eliminar"></td>' +
          "</tr>";
        $("#DataPasajeros").html(Pasajeros);
      }
    },
  });
}

function CargarPasajero(P_codigo_pasajero) {
  var datosPasajero = {
    codigo_pasajero: P_codigo_pasajero,
  };
  var datosPasajeroJson = JSON.stringify(datosPasajero);

  $.ajax({
    url: UrlApiGetUno,
    type: "POST",
    data: datosPasajeroJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      var MisPasajeros = response;
      for (let i = 0; i < MisPasajeros.length; i++) {
        $("#codigo_pasajero").val(MisPasajeros[i].codigo_pasajero);
        $("#nombres").val(MisPasajeros[i].nombres);
        $("#apellidos").val(MisPasajeros[i].apellidos);
        $("#fecha_registro").val(MisPasajeros[i].fecha_registro);
        $("#nacionalidad").val(MisPasajeros[i].nacionalidad);
        $("#numero_telefono").val(MisPasajeros[i].numero_telefono);
        $("#email").val(MisPasajeros[i].email);
        var btnActualizar =
          '<input type="button" onclick="ActualizarPasajero(' +
          MisPasajeros[i].codigo_pasajero +
          ')" id="btnActualizarPasajero" class="btn btn-primary" value="Actualizar Pasajero"></input>';
        $("#btnAgregarPasajeros").html(btnActualizar);
      }
    },
  });
}

function AgregarPasajero() {
  var datosPasajero = {
    codigo_pasajero: $("#codigo_pasajero").val(),
    nombres: $("#nombres").val(),
    apellidos: $("#apellidos").val(),
    fecha_registro: $("#fecha_registro").val(),
    nacionalidad: $("#nacionalidad").val(),
    numero_telefono: $("#numero_telefono").val(),
    email: $("#email").val(),
  };

  var datosPasajeroJson = JSON.stringify(datosPasajero);

  $.ajax({
    url: UrlApiInsert,
    type: "POST",
    data: datosPasajeroJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      alert("---Pasajero Ingresado Exitosamente---");
      $("#FormularioPasajeros").submit();
    },
    error: function (textError, errorThrown) {
      alert("Error: " + textError + errorThrown);
    },
  });
}

function ActualizarPasajero() {
  var datosPasajero = {
    codigo_pasajero: $("#codigo_pasajero").val(),
    nombres: $("#nombres").val(),
    apellidos: $("#apellidos").val(),
    fecha_registro: $("#fecha_registro").val(),
    nacionalidad: $("#nacionalidad").val(),
    numero_telefono: $("#numero_telefono").val(),
    email: $("#email").val(),
  };

  var datosPasajeroJson = JSON.stringify(datosPasajero);

  $.ajax({
    url: UrlApiActualizar,
    type: "PUT",
    data: datosPasajeroJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      alert("---Pasajero ha sido Actualizado Exitosamente---");
      $("#FormularioPasajeros").submit();
    },
    error: function (textError, errorThrown) {
      alert("Error: " + textError + errorThrown);
    },
  });
}

function EliminarPasajero(P_codigo_pasajero) {
  var datosPasajero = {
    codigo_pasajero: P_codigo_pasajero,
  };
  var datosPasajeroJson = JSON.stringify(datosPasajero);

  $.ajax({
    url: UrlApiEliminar,
    type: "DELETE",
    data: datosPasajeroJson,
    datatype: "JSON",
    contentType: "application/json",
    success: function (response) {
      var MisPasajeros = response;
      alert(response);
      CargarPasajeros();
    },
  });
}
