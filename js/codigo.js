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

var crudApp = new function () {

    // AN ARRAY OF JSON OBJECTS WITH VALUES.
    this.productos = [
        { ID: '1', Nombre: 'Sierra', Categoría: 'Herramientas', Precio: 45 , Marca:'Bosch' , Código:'s-01' ,Unidades:45},
        { ID: '2', Nombre: 'Aire Acondicionado', Categoría: 'Aires', Precio: 2200, Marca:'LG' , Código:'aa-01' ,Unidades:200},
        { ID: '3', Nombre: 'Manguera', Categoría: 'Jardinería', Precio: 12 , Marca:'Nts' , Código:'m-01' ,Unidades:70},
        { ID: '4', Nombre: 'Amasadora', Categoría: 'Construcción', Precio: 200 , Marca:'Altrad' , Código:'am-01' ,Unidades:30},
        { ID: '5', Nombre: 'Grifo', Categoría: 'Baños', Precio: 45 , Marca:'Roca' , Código:'g-01' ,Unidades:50},
        { ID: '6', Nombre: 'Pintura', Categoría: 'Pinturas', Precio: 10 , Marca:'Alp' , Código:'p-01' ,Unidades:80}
    ]

    this.categoria = ['Herramientas', 'Aires', 'Construcción', 'Jardinería','Baños','Pinturas'];
    this.col = [];

    this.createTable = function () {

        // Extraemos valores de productos
        for (var i = 0; i < 5; i++) {
            for (var key in this.productos[i]) {
                if (this.col.indexOf(key) === -1) { //Si no hay columnas
                    this.col.push(key);
                }
            }
        }

        // Creamos la tabla
        var table = document.createElement('table');
        table.setAttribute('id', 'infotable');     // Según su ID

        var tr = table.insertRow(-1);               // Crear fila para cabecera de tabla.

        for (var h = 0; h < 5; h++) {
            // Añadimos la cabecera
            var th = document.createElement('th');
            th.innerHTML = this.col[h];
            tr.appendChild(th);
        }

        // Añadir filas usando la información de JSON
        for (var i = 0; i < this.productos.length; i++) {

            tr = table.insertRow(-1);           // Nueva fila.

            for (var j = 0; j < 5; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.productos[i][this.col[j]];
            }

            // Crear y añadir filas en la página
            this.td = document.createElement('td');

            // Opción de cancelar
            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            // Opción de guardar
            tr.appendChild(this.td);
            var btSave = document.createElement('input');
            btSave.setAttribute('type', 'button');
            btSave.setAttribute('value', 'Guardar');
            btSave.setAttribute('id', 'Guardar' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');
            this.td.appendChild(btSave);

            // Opción de editar
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');
            btUpdate.setAttribute('type', 'button');
            btUpdate.setAttribute('value', 'Editar');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#207DD1;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');
            this.td.appendChild(btUpdate);

            // Opción de borrar
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');
            btDelete.setAttribute('value', 'Borrar');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');
            this.td.appendChild(btDelete);
        }


        // Añadir nuevo producto

        tr = table.insertRow(-1);           // Última fila

        for (var j = 0; j < 5; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j == 2) {   // Crear un dropdown para Categoría.

                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.categoria.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.categoria[k] + '">' + this.categoria[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else {
                    var tBox = document.createElement('input');          //Creamos cuadros de texto.
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');
        btNew.setAttribute('value', 'Nuevo');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#2DBF64;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');
        this.td.appendChild(btNew);

        var div = document.getElementById('container');
        div.innerHTML = '';
        div.appendChild(table);
    };

    // Operaciones

    // Cancelar X
    this.Cancel = function (oButton) {

        // Ocultarlo.
        oButton.setAttribute('style', 'display:none; float:none;');
        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // Guardar
        var btSave = document.getElementById('Guardar' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // Mostar editar otra vez
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#207DD1;');

        var tab = document.getElementById('infotable').rows[activeRow];

        for (i = 0; i < 5; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.productos[(activeRow - 1)][this.col[i]];
        }
    }


    // Editar
    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('infotable').rows[activeRow];

        // Recorremos para marcar todos los campos como editables
        for (i = 1; i < 5; i++) {

            if (i == 2) {       // Si es el campo de categorías hacer el dropdown
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.categoria.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.categoria[k] + '">' + this.categoria[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // Si son los otros campos son de tipo bloque de texto
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('Guardar' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#44CCEB;');

        // Ocultar botón
        oButton.setAttribute('style', 'display:none;');
    };


    // Borrar información.
    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.productos.splice((activeRow - 1), 1);    // Borrar fila
        this.createTable();                         // Actualiza tabla
    };

    // Guardar información.
    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('infotable').rows[activeRow];

        // Actualizar información.
        for (i = 1; i < 5; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // Comprueba si es Categoría u otro campo
                this.productos[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      // Guardar valores.
            }
        }
        this.createTable();     // Actualiza tabla.
    }

    // Crear nueva información.
    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('infotable').rows[activeRow];
        var obj = {};

        // Añadir valores.
        for (i = 1; i < 5; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // Comprueba si es Categoría u otro campo
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.productos.length + 1;     // Nuevo ID.

        if (Object.keys(obj).length > 0) {      // Comprueba que los campos no están vacíos.
            this.productos.push(obj);             // Añade esos campos al JSON(hasta que se actualice la página).
            this.createTable();                 // Actualiza tabla.
        }
    }

}

crudApp.createTable();


