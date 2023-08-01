var UrlApiGetAll = 'http://localhost:5002/avion/getAll';
var UrlApiInsert = 'http://localhost:5002/avion/insertar/:numero_avion';
var UrlApiGetUno = 'http://localhost:5002/avion/getOne/:numero_avion';
var UrlApiUpdate = 'http://localhost:5002/avion/actualizar/:numero_avion';
var UrlApiDelete = 'http://localhost:5002/avion/eliminar/:numero_avion';

$(document).ready(function(){
    CargarAviones();

    // Evento para el botón "Editar"
    $(document).on('click', '.btn-editar', function () {
        var numero_avion = $(this).data('codigo');
        CargarAviones(numero_avion);
    });

    // Evento para el botón "Actualizar"
    $(document).on('click', '.btn-actualizar', function () {
        var numero_avion = $(this).data('codigo');
        ActualizarAvion(numero_avion);
    });

    // Evento para el botón "Eliminar"
    $(document).on('click', '.btn-eliminar', function () {
        var numero_avion = $(this).data('codigo');
        EliminarAvion(numero_avion);
    });

    
})

function CargarAviones(){
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
            '<td>'+ MiItems[i].numero_avion +'</td>'+
            '<td>'+ MiItems[i].tipo_avion +'</td>'+
            '<td>'+ MiItems[i].horas_vuelo +'</td>'+
            '<td>'+ MiItems[i].capacidad_pasajeros +'</td>'+
            '<td>'+ MiItems[i].fecha_primer_vuelo +'</td>'+
            '<td>'+ MiItems[i].pais_construccion +'</td>'+
            '<td>'+ MiItems[i].cantidad_vuelos +'</td>'+
            '<td> ' +
            '<button class="btn btn-primary btn-editar" data-codigo="' + MiItems[i].numero_avion + '">Editar</button>' +
            '</td>' +
            '<td> ' +
            '<button class="btn btn-danger btn-eliminar" data-codigo="' + MiItems[i].numero_avion + '">Eliminar</button>' +
            '</td>' +
            '</tr>';
            $('#DataAviones').html(Valores);
        }
    }
 });
}

function AgregarAvion(){
    var datosavion = {
        numero_avion :$('#NUMEROAVI').val(),
        tipo_avion :$('#TIPOAVI').val(),
        horas_vuelo :$('#HORASVUE').val(),
        capacidad_pasajeros :$('#CAPACIDADPAS').val(),
        fecha_primer_vuelo :$('#FECHAPRIMERVUE').val(),
        pais_construccion :$('#PAISCON').val(),
        cantidad_vuelos :$('#CANTIDADVUE').val()
    };

    var datosavionjson = JSON.stringify(datosavion);
    //alert(datosavionjson)

    $.ajax({
        url:UrlApiInsert,
        type: 'POST',
        data : datosavionjson,
        datatype: 'JSON',
        contentType : 'application/json',
        success : function(respuesta){
            //console.log(respuesta)
            alert('Avion ingresado de forma correcta');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error: '+ textError + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarAvion(p_numero_avion){

    var datosavion = {
        numero_avion : p_numero_avion
    };

    var datosavionjson = JSON.stringify(datosavion);

    $.ajax({
        url:UrlApiGetUno,
        type: 'POST',
        data : datosavionjson,
        datatype: 'JSON',
        contentType : 'application/json', 
        success : function(response){
            var MiItems = response;
            for(i=0; i < MiItems.length; i++){
                $('#NUMEROAVI').val(MiItems[i].numero_avion);
                $('#TIPOAVI').val(MiItems[i].tipo_avion);
                $('#HORASVUE').val(MiItems[i].horas_vuelo);
                $('#CAPACIDADPAS').val(MiItems[i].capacidad_pasajeros);
                $('#FECHAPRIMERVUE').val(MiItems[i].fecha_primer_vuelo);
                $('#PAISCON').val(MiItems[i].pais_construccion);
                $('#CANTIDADVUE').val(MiItems[i].cantidad_vuelos);
                //var btnactualizar = '<input type="submit" class="btn btn-primary" ' +
                //'id="btnagregar" onclick="ActualizarAvion('+ MiItems[i].numero_avion +')" value="Actualizar Avion" >';
                var btnactualizar = '<button type="button" class="btn btn-primary btn-actualizar" ' +
                'data-codigo="' + MiItems[i].numero_avion + '">Actualizar Avion</button>';
                $('#btnagregaravion').html(btnactualizar);
            }
        }
    });
}

function ActualizarAvion(p_numero_avion){

    var datosavion={
        numero_avion :$('#NUMEROAVI').val(),
        tipo_avion :$('#TIPOAVI').val(),
        horas_vuelo :$('#HORASVUE').val(),
        capacidad_pasajeros :$('#CAPACIDADPAS').val(),
        fecha_primer_vuelo :$('#FECHAPRIMERVUE').val(),
        pais_construccion :$('#PAISCON').val(),
        cantidad_vuelos :$('#CANTIDADVUE').val()
    };

    var datosavionjson =JSON.stringify(datosavion);
    alert(datosavionjson)

    $.ajax({
        url: urlApiUpdate,
        type: 'PUT',
        data: datosavionjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Avion Actualizado Correctamente');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            console.log('Error:', textError, errorThrown);
            alert('Error: ' + textError + ' ' + errorThrown);
        }
    });
    alert('Aviso');
}


function EliminarAvion(p_numero_avion){

    var datosavion = {
        numero_avion : p_numero_avion
    };

    var datosavionjson = JSON.stringify(datosavion);

    $.ajax({
        url : UrlApiDelete,
        type: 'DELETE',
        data : datosavionjson,
        datatype: 'JSON',
        contentType : 'application/json',
        success : function(respuesta){
            //console.log(respuesta)
            alert('Avion eliminado de forma correcta');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error: ' + textError + ' ' + errorThrown);
        }
    });
    alert('Aviso');
}