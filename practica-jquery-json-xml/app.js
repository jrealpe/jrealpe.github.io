var usuarios = []
var servicios_basicos = [];

function anadirClick() {
  $('#lista-usuarios li a').click(function(){
    servicios = $(this).data('u');
    $('#info').empty();

    $.each(servicios, function( indice, value){
      servicio = value;

      p = $('<p>').text('Servicio: ' + servicio.tipo);
      p.append('<br>Nombre: ' + servicio.nombre);
      p.append('<br>Direccion: ' + servicio.direccion);
      p.append('<br>Telefono: ' + servicio.telefono);
      p.append('<br>Deuda: ' + servicio.deuda);
      p.append('<br><br>');

      $('#info').append(p);

    });
  });
}

function getGastos(){

  $.ajax({
      url: 'gastos_personales.json',
      dataType: 'json',
      type: 'GET',
      error: function() {
        alert('¡Ocurrió un error!');
      },
      success: function(data) {
        $.each(data, function( i1, v1 ) {
          let servicios = [];
          let deuda_total = 0;

          $.each(v1.servicios, function( i2, v2 ){

            $.each(servicios_basicos, function( i3, v3 ){
              if (v2.servicio == v3.tipo) {
                servicio = v3;
                servicio['deuda'] = v2.deuda;
                servicios.push(servicio);
                deuda_total += parseFloat(v2.deuda);
              }
            });
          });

          usuario = {
            'nombre':v1.nombre,
            'servicios':servicios
          };

          usuarios.push(usuario);

          ul_item = $('<ul>');

          l_usuario = $('<li>');
          l_usuario.appendTo(ul_item);

          l_deuda_total = $('<li>');
          l_deuda_total.text('Deuda Total: $' + deuda_total.toFixed(2));
          l_deuda_total.appendTo(ul_item);

          la_item = $('<a>');
          la_item.text('Nombre: ' + v1.nombre);
          la_item.attr('href', '#');
          console.log(JSON.stringify(v1));
          la_item.attr('data-u', JSON.stringify(servicios));
          la_item.appendTo(l_usuario);

          $('#lista-usuarios').append(ul_item);
          $('#lista-usuarios').append('<br>');


          anadirClick();

        });
        console.log(usuarios);
      }
  });

}

$(window).load(function() {
  $.ajax({
      url: 'servicios_basicos.xml',
      dataType: 'xml',
      type: 'GET',
      error: function() {
        alert('¡Ocurrió un error!');
      },
      success: function(data) {
        $(data).find('servicio').each(function(){
          let servicio = {
            'tipo': $(this).attr('tipo'),
            'nombre': $(this).find('nombre').text(),
            'direccion': $(this).find('direccion').text(),
            'telefono': $(this).find('telefono').text()
          };
          servicios_basicos.push(servicio);
        });

        getGastos();
      }
  });


});
