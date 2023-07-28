var UrlApiGetAll = 'http://localhost:5002/vuelo/getAll';
var UrlApiGetUno = 'http://localhost:5002/vuelo/getOne/:codigo_vuelo';
var UrlApiInsert = 'http://localhost:5002/insertar/:codigo_vuelo';
var UrlApiUpdate = 'http://localhost:5002/actualizar/:codigo_vuelo';
var UrlApiDelete = 'http://localhost:5002/eliminar/:codigo_vuelo';

$(document).ready(function(){
    CargarVuelo();
})

function CargarVuelo(){
 $.ajax({
    url:UrlApiGetAll,
    type: 'GET',
    datatype: 'JSON',
    success: function(response){
        var MiItems = response;
        var Valores = '';
        for(i=0; i < MiItems.length; i++){
            Valores +=
            '<tr>'
            '<td>'+ MiItems[i].codigo_vuelo +'</td>'+
            '<td>'+ MiItems[i].ciudad_origen +'</td>'+
            '<td>'+ MiItems[i].ciudad_destino +'</td>'+
            '<td>'+ MiItems[i].fecha_vuelo +'</td>'+
            '<td>'+ MiItems[i].cantidad_pasajeros +'</td>'+
            '<td>'+ MiItems[i].tipo_avion +'</td>'+
            '<td>'+ MiItems[i].distancia_km +'</td>'+
            '<td>'+
            '</td>'+
            '</tr>';
            $('#DataVuelo').html(Valores);
        }
    }
 });
}