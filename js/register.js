$(document).ready(function() {
    $("#registro").validate({
        //reglas que se deben cumplir
        rules: {
            nombre: {
                required: true,
                minlength: 4,
                maxlength: 15
            },
            apellidos: {
                required: true,
                minlength: 4,
                maxlength: 25
            },
            correo: {
                required: true,
                email: true,
            },
            contrasena:{
                required: true,
                minlength: 6,
                maxlength: 30,
            },
            confirmarContrasena: {
                required: true,
                equalTo: "#contraseña"
            },
            dni: {
                required: false,
                minlength: 9,
                maxlength: 9,
            },
            telefono:{
                required: false,
                minlength: 9,
                maxlength: 9,
            },
            direccion: {
                required: false,
                minlength: 5,
                maxlength: 30
            },
            numero: {
                required: false,
                minlength: 1,
                maxlength: 4
            },
            piso: {
                required: false,
                minlength: 1,
                maxlength: 2
            },
            ciudad: {
                required: false,
                minlength: 4,
                maxlength: 30,
            },
            codigo:{
                required: false,
                minlength:5,
                maxlength:5,
            },
            checkbox: {
                required: true,
            }
        },

        //mensajes
        messages: {
            nombre: {
                required: "Introduzca su nombre",
                minlength: "Mínimo 4 caracteres",
                maxlength: "Máximo 15 caracteres"
            },
            apellidos: {
                required: "Introduzca sus apellidos",
                minlength: "Como mínimo 4 caracteres",
                maxlength: "Como máximo 25 caracteres"
            },
            correo: {
                required: "Introduzca su email",
                email: "Introduza una dirección válida",
            },
            contrasena:{
                required: "Introduzca una nueva contraseña",
                minlength: "Mínimo 6 caracteres",
                maxlength: "Máximo 30 caracteres"
            },
            confirmarContrasena: {
                required: "Introduzca la misma contraseña",
                equalTo: "Las contraseñas no coinciden"
            },
            dni: {
                minlength: "Mínimo 9 caracteres",
                maxlength: "Maximo 9 caracteres",
            },
            telefono:{
                minlength: "Mínimo 9 cifras",
                maxlength: "Máximo 9 cifras",
            },
            direccion: {
                minlength: "Mínimo 5 caracteres",
                maxlength: "Máximo 30 caracteres"
            },
            numero: {
                minlength: "Mínimo 1 dígito",
                maxlength: "Máximo 4 dígito"
            },
            piso: {
                maxlength: "Máximo 2 dígitos"
            },
            ciudad: {
                minlength: "Mínimo 4 caracteres",
                maxlength: "Máximo 30 caracteres",
            },
            codigo:{
                minlength: "Al menos 5 dígitos",
                maxlength: "Máximo 5 dígitos",
            },
            checkbox: {
                required: "Debe aceptar nuestros Términos y Condiciones",
            }

        }
    });
});