$(document).ready(function() {
    $("#fContacto").validate({
        //reglas que se deben cumplir
        rules: {
            nombre: {
                required: true,
                minlength: 4,
                maxlength: 30
            },
            nombreE: {
                required: false,
                minlength: 2,
                maxlength: 25
            },
            dni: {
                required: true,
                minlength: 9,
                maxlength: 9,
            },
            telefono:{
                required: true,
                minlength: 9,
                maxlength: 9,
            },
            correo: {
                required: true,
                email: true,
            },
            mensaje: {
                required: true,
                maxlength: 500
            }

        },

        //mensajes
        messages: {
            nombre: {
                required: "Introduzca su nombre",
                minlength: "Mínimo 4 caracteres",
                maxlength: "Máximo 30 caracteres"
            },
            nombreE: {
                minlength: "Mínimo 2 caracteres",
                maxlength: "Máximo 25 caracteres"
            },
            dni: {
                required: "Introduzca su DNI",
                minlength: "Mínimo 9 caracteres",
                maxlength: "Máximo 9 caracteres",
            },
            telefono:{
                required: "Introduzca su número de teléfono",
                minlength: "Mínimo 9 dígitos",
                maxlength: "Máximo 9 dígitos",
            },
            correo: {
                required: "Introduzca su correo electrónico",
                email: "Introduzca una dirección válida",
            },
            mensaje:{
                required: "Introduzca su mensaje",
                maxlength: "Máximo 500 caracteres"
            }
        }
    });
});