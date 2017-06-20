var usuarios = []
var servicios_basicos = [];

function getServicios(){
  $.ajax({
      url: 'servicios_basicos.xml',
      dataType: 'xml',
      type: 'GET',
      error: function() {
        alert('¡Ocurrió un error!');
      },
      success: function(data) {

        $(data).find('servicio').each(function(){

          servicio = {
            'tipo': $(this).attr('tipo'),
            'nombre': $(this).find('nombre').text(),
            'direccion': $(this).find('direccion').text(),
            'telefono': $(this).find('telefono').text()
          };

          l_servicio = $('<li>');

          la_item = $('<a>');
          la_item.text(servicio.tipo);
          la_item.attr('href', '#');
          la_item.attr('data-s', JSON.stringify(servicio));
          la_item.appendTo(l_servicio);

          $('#lista-servicios').append(l_servicio);

          console.log(servicio.tipo);

        });

        // Click
        $('#lista-servicios li a').click(function(){
          servicio = $(this).data('s');

          $.ajax({
              url: 'gastos_personales.json',
              dataType: 'json',
              type: 'GET',
              error: function() {
                alert('¡Ocurrió un error!');
              },
              success: function(data) {
                deuda_total = 0

                $('#detail').empty();
                $.each(data, function( i1, v1 ) {
                   console.log(v1.nombre);

                  $.each(v1.servicios, function( i2, v2){
                    if (v2.servicio == servicio.tipo) {
                      deuda_total += parseFloat(v2.deuda);

                      u_row = $('<tr>')
                      u_row.append($('<td>').text(v1.nombre));
                      u_row.append($('<td>').text('$' + v2.deuda));

                      $('#detail').append(u_row);
                    }
                  });
                });

                $('#detail').append('<br>');

                u_row = $('<tr>')
                u_row.append($('<td>').text('TOTAL'));
                u_row.append($('<td>').text('$' + deuda_total.toFixed(2)));

                $('#detail').append(u_row);
              }
          });
        });

      }
  });

}

$(window).load(function() {
  getServicios();
});
