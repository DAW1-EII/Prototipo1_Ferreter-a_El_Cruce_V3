$(document).ready(function() {
    $("#formlg").validate({
        //reglas que se deben cumplir
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true
            }
        },

        //mensajes
        messages: {
            email: {
                required: "Introduzca su correo",
                email: "Introduzca una dirección de correo válida"
            },
            password: {
                required: "Introduzca su contraseña"
            }

        }
    });
});