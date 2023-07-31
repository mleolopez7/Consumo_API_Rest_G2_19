var UrlApiGetAll = 'http://localhost:5002/pasajeros/getAll';
var UrlApiInsert = 'http://localhost:5002/pasajeros/insert/:codigo_pasajero';
var UrlApiGetOne = 'http://localhost:5002/pasajeros/getone/:codigo_pasajero';
var UrlApiUpdate = 'http://localhost:5002/pasajeros/update/:codigo_pasajero';
var UrlApiDelete = 'http://localhost:5002/pasajeros/eliminar/:codigo_pasajero';

$(document).ready(function () {
  CargarPasajeros();

  // Evento para el botón 'Editar'
  $(document).on('click', '.btn-editar', function () {
    var codigo_pasajero = $(this).data('codigo');
    CargarPasajeros(codigo_pasajero);
  });

  // Evento para el botón 'Actualizar'
  $(document).on('click', '.btn-actualizar', function () {
    var codigo_pasajero = $(this).data('codigo');
    ActualizarPasajeros(codigo_pasajero);
  });

  // Evento para el botón 'Eliminar'
  $(document).on('click', '.btn-eliminar', function () {
    var codigo_pasajero = $(this).data('codigo');
    EliminarPasajeros(codigo_pasajero);
  });
});

function CargarPasajeros() {
  $.ajax({
    url: UrlApiGetAll,
    type: 'GET',
    datatype: 'JSON',
    success: function (response) {
      var MiItems = response;
      var Valores = '';
      for (i = 0; i < MiItems.length; i++) {
        Valores +=
          "<tr>" +
          "<td>" +
          MiItems[i].codigo_pasajero +
          "</td>" +
          "<td>" +
          MiItems[i].nombres +
          "</td>" +
          "<td>" +
          MiItems[i].apellidos +
          "</td>" +
          "<td>" +
          MiItems[i].fecha_registro +
          "</td>" +
          "<td>" +
          MiItems[i].nacionalidad +
          "</td>" +
          "<td>" +
          MiItems[i].numero_telefono +
          "</td>" +
          "<td>" +
          MiItems[i].email +
          "</td>" +
          "<td>" +
          '<button class="btn btn-primary btn-editar" data-codigo="' +
          MiItems[i].codigo_pasajero +
          '">Editar</button>' +
          "</td>" +
          "<td>" +
          '<button class="btn btn-danger btn-eliminar" data-codigo="' +
          MiItems[i].codigo_pasajero +
          '">Eliminar</button>' +
          "</td>" +
          "</tr>";
        $('#DataPasajeros').html(Valores);
      }
    },
  });
}

function AgregarPasajeros() {
  var datospasajeros = {
    codigo_pasajero: $('#CODIGO_PASAJERO').val(),
    nombres: $('#NOMBRES').val(),
    apellidos: $('#APELLIDOS').val(),
    fecha_registro: $('#FECHA_REGISTRO').val(),
    nacionalidad: $('#NACIONALIDAD').val(),
    numero_telefono: $('#NUMERO_TELEFONO').val(),
    email: $('#EMAIL').val(),
  };

  var datospasajerosjson = JSON.stringify(datospasajeros);
  //alert(datosvuelojson)

  $.ajax({
    url: UrlApiInsert,
    type: 'POST',
    data: datospasajerosjson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (respuesta) {
      //console.log(respuesta)
      alert('Pasajeros ingresado de forma correcta');
      $("#Miformulario").submit();
    },
    error: function (textError, errorThrown) {
      alert('Error: ' + textError + errorThrown);
    },
  });
  alert('Aviso');
}

function CargarPasajeros(p_codigo_pasajero) {
  var datospasajeros = {
    codigo_pasajero: p_codigo_pasajero,
  };

  var datospasajerosjson = JSON.stringify(datospasajeros);

  $.ajax({
    url: UrlApiGetUno,
    type: 'POST',
    data: datospasajerosjson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (response) {
      var MiItems = response;
      for (i = 0; i < MiItems.length; i++) {
        $('#CODIGO_PASAJERO').val(MyItems[i].codigo_pasajero);
        $('#NOMBRES').val(MyItems[i].nombres);
        $('#APELLIDOS').val(MyItems[i].apellidos);
        $('#FECHA_REGISTRO').val(MyItems[i].fecha_registro);
        $('#NACIONALIDAD').val(MyItems[i].nacionalidad);
        $('#NUMERO_TELEFONO').val(MyItems[i].numero_telefono);
        $('#EMAIL').val(MyItems[i].email);
        //var btnactualizar = '<input type="submit" class="btn btn-primary" ' +
        //'id="btnagregar" onclick="ActualizarPasajeros('+ MiItems[i].codigo_pasajero +')" value="Actualizar Pasajeros" >';
        var btnactualizar =
          '<button type="button" class="btn btn-primary btn-actualizar" ' +
          'data-codigo="' +
          MiItems[i].codigo_pasajero +
          '">Actualizar Pasajeros</button>';
        $('#btnagregarpasajeros').html(btnactualizar);
      }
    },
  });
}

function ActualizarPasajeros(p_codigo_pasajero) {
  var datospasajero = {
    codigo_pasajero: pcodigo_pasajero,
    nombres: $('#NOMBRES').val(),
    apellidos: $('#APELLIDOS').val(),
    fecha_registro: $('#FECHA_REGISTRO').val(),
    nacionalidad: $('#NACIONALIDAD').val(),
    numero_telefono: $('#NUMERO_TELEFONO').val(),
    email: $('#EMAIL').val(),
  };

  var datospasajerosjson = JSON.stringify(datospasajeros);
  alert(datospasajerosjson);

  $.ajax({
    url: UrlApiUpdate,
    type: 'PUT',
    data: datospasajerosjson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (response) {
      //console.log(response);
      alert('Pasajeros Actualizado Correctamente');
      $("#Miformulario").submit();
    },
    error: function (textError, errorThrown) {
      //console.log('Error:', textError, errorThrown);
      alert("Error: " + textError + " " + errorThrown);
    },
  });
  alert('Aviso');
}

function EliminarPasajeros(p_codigo_pasajero) {
  var datospasajeros = {
    codigo_pasajero: p_codigo_pasajero,
  };

  var datospasajerosjson = JSON.stringify(datospasajeros);

  $.ajax({
    url: UrlApiDelete,
    type: 'DELETE',
    data: datospasajerosjson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (respuesta) {
      //console.log(respuesta)
      alert('Vuelo eliminado de forma correcta');
      $('#Miformulario').submit();
    },
    error: function (textError, errorThrown) {
      alert('Error: ' + textError + '' + errorThrown);
    },
  });
  alert('Aviso');
}