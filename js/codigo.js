jQuery(document).on('submit','#formlg',function (event) {
    event.preventDefault(); //evita el envio d edatos

    jQuery.ajax({
        url: 'json/productos.json',
        type: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function () {
            
        }
    })
        .done(function (respuesta) {
            console.log(respuesta);
        })
        .fail(function (resp) {
            console.log(resp.responseText);
        })
        .always(function () {
            console.log("complete");
        })

})


