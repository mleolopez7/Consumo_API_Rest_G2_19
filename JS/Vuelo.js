var UrlApiGetAll = 'http://localhost:5002/vuelo/getAll';
var UrlApiInsert = 'http://localhost:5002/vuelo/insertar/:codigo_vuelo';
var UrlApiGetUno = 'http://localhost:5002/vuelo/getOne/:codigo_vuelo';
var UrlApiUpdate = 'http://localhost:5002/vuelo/actualizar/:codigo_vuelo';
var UrlApiDelete = 'http://localhost:5002/vuelo/eliminar/:codigo_vuelo';

$(document).ready(function(){
    CargarVuelos();

    // Evento para el botón "Editar"
    $(document).on('click', '.btn-editar', function () {
        var codigo_vuelo = $(this).data('codigo');
        CargarVuelo(codigo_vuelo);
    });

    // Evento para el botón "Actualizar"
    $(document).on('click', '.btn-actualizar', function () {
        var codigoVuelo = $(this).data('codigo');
        ActualizarVuelo(codigoVuelo);
    });

    // Evento para el botón "Eliminar"
    $(document).on('click', '.btn-eliminar', function () {
        var codigo_vuelo = $(this).data('codigo');
        EliminarVuelo(codigo_vuelo);
    });

    
})

function CargarVuelos(){
 $.ajax({
    url:UrlApiGetAll,
    type: 'GET',
    datatype: 'JSON',
    success: function(response){
        var MiItems = response;
        var Valores = '';
        for(i=0; i < MiItems.length; i++){
            Valores +=
            '<tr>'+
            '<td>'+ MiItems[i].codigo_vuelo +'</td>'+
            '<td>'+ MiItems[i].ciudad_origen +'</td>'+
            '<td>'+ MiItems[i].ciudad_destino +'</td>'+
            '<td>'+ MiItems[i].fecha_vuelo +'</td>'+
            '<td>'+ MiItems[i].cantidad_pasajeros +'</td>'+
            '<td>'+ MiItems[i].tipo_avion +'</td>'+
            '<td>'+ MiItems[i].distancia_km +'</td>'+
            '<td> ' +
            '<button class="btn btn-primary btn-editar" data-codigo="' + MiItems[i].codigo_vuelo + '">Editar</button>' +
            '</td>' +
            '<td> ' +
            '<button class="btn btn-danger btn-eliminar" data-codigo="' + MiItems[i].codigo_vuelo + '">Eliminar</button>' +
            '</td>' +
            '</tr>';
            $('#DataVuelos').html(Valores);
        }
    }
 });
}

function AgregarVuelo(){
    var datosvuelo = {
        codigo_vuelo :$('#CODIGOVUE').val(),
        ciudad_origen :$('#CIUDADORI').val(),
        ciudad_destino :$('#CIUDADDES').val(),
        fecha_vuelo :$('#FECHAVUE').val(),
        cantidad_pasajeros :$('#CANTIDADPAS').val(),
        tipo_avion :$('#TIPOAVI').val(),
        distancia_km :$('#DISTANCIA').val()
    };

    var datosvuelojson = JSON.stringify(datosvuelo);
    //alert(datosvuelojson)

    $.ajax({
        url:UrlApiInsert,
        type: 'POST',
        data : datosvuelojson,
        datatype: 'JSON',
        contentType : 'application/json',
        success : function(respuesta){
            //console.log(respuesta)
            alert('Vuelo ingresado de forma correcta');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarVuelo(p_codigo_vuelo){

    var datosvuelo = {
        codigo_vuelo : p_codigo_vuelo
    };

    var datosvuelojson = JSON.stringify(datosvuelo);

    $.ajax({
        url:UrlApiGetUno,
        type: 'POST',
        data : datosvuelojson,
        datatype: 'JSON',
        contentType : 'application/json', 
        success : function(response){
            var MiItems = response;
            for(i=0; i < MiItems.length; i++){
                $('#CODIGOVUE').val(MiItems[i].codigo_vuelo);
                $('#CIUDADORI').val(MiItems[i].ciudad_origen);
                $('#CIUDADDES').val(MiItems[i].ciudad_destino);
                $('#FECHAVUE').val(MiItems[i].fecha_vuelo);
                $('#CANTIDADPAS').val(MiItems[i].cantidad_pasajeros);
                $('#TIPOAVI').val(MiItems[i].tipo_avion);
                $('#DISTANCIA').val(MiItems[i].distancia_km);
                //var btnactualizar = '<input type="submit" class="btn btn-primary" ' +
                //'id="btnagregar" onclick="ActualizarVuelo('+ MiItems[i].codigo_vuelo +')" value="Actualizar Vuelo" >';
                var btnactualizar = '<button type="button" class="btn btn-primary btn-actualizar" ' +
                'data-codigo="' + MiItems[i].codigo_vuelo + '">Actualizar Vuelo</button>';
                $('#btnagregarvuelo').html(btnactualizar);
            }
        }
    });
}

function ActualizarVuelo(p_codigo_vuelo){

    var datosvuelo={
        codigo_vuelo :$('#CODIGOVUE').val(),
        ciudad_origen :$('#CIUDADORI').val(),
        ciudad_destino :$('#CIUDADDES').val(),
        fecha_vuelo :$('#FECHAVUE').val(),
        cantidad_pasajeros :$('#CANTIDADPAS').val(),
        tipo_avion :$('#TIPOAVI').val(),
        distancia_km :$('#DISTANCIA').val()
    };

    var datosvuelojson =JSON.stringify(datosvuelo);
    alert(datosvuelojson)

    $.ajax({
        url: urlApiUpdate,
        type: 'PUT',
        data: datosvuelojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Vuelo Actualizado Correctamente');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            console.log('Error:', textError, errorThrown);
            alert('Error: ' + textError + ' ' + errorThrown);
        }
    });
    alert('Aviso');
}


function EliminarVuelo(p_codigo_vuelo){

    var datosvuelo = {
        codigo_vuelo : p_codigo_vuelo
    };

    var datosvuelojson = JSON.stringify(datosvuelo);

    $.ajax({
        url : UrlApiDelete,
        type: 'DELETE',
        data : datosvuelojson,
        datatype: 'JSON',
        contentType : 'application/json',
        success : function(respuesta){
            //console.log(respuesta)
            alert('Vuelo eliminado de forma correcta');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error: ' + textError + ' ' + errorThrown);
        }
    });
    alert('Aviso');
}