var botonGuardar = document.querySelector('#btnGuardar');
var seccionTareas = document.querySelector('#listaTareas');
var mensaje = document.querySelector('#mensaje');
var selectPrioridad = document.querySelector('#filtroPrioridad');
var idTarea = 4;

// Events

selectPrioridad.addEventListener('change', pintarPrioridad);

botonGuardar.addEventListener('click', event => {
    event.preventDefault();
    mensaje.innerText = "";

    // Datos que introduce el usuario
    let tarea = document.querySelector('#introducirTarea').value;
    let prioridad = document.querySelector('#prioridad').value;

    if (tarea != "" && prioridad != "") {
        guardaDatos(tarea, prioridad);
    } else {
        mensaje.innerText = "¡Atento! Debes rellenar los dos campos";
    }
})

// Filters

function guardaDatos(pTarea, pPrioridad) {

    let registro = new Object();
    registro.tarea = pTarea;
    registro.prioridad = pPrioridad;
    registro.id = idTarea;

    //Push del objeto en el array allTareas

    allTareas.push(registro);
    pintarRegistro(registro);
    idTarea++;
}

function pintarRegistro(pObjeto) {

    switch (pObjeto.prioridad) {
        case "diaria":
            color = "diaria";
            break;
        case "mensual":
            color = "mensual";
            break;
        case "urgente":
            color = "urgente";
            break;
    }
    seccionTareas.innerHTML += `<li class="${color}">${pObjeto.tarea}<span onclick="eliminarTarea(event)" id="btnEliminar"><i class="fas fa-trash-alt"></i></span></li>`
}

function pintarRegistros(pArrayObjeto) {
    for (registro of pArrayObjeto) {
        pintarRegistro(registro);
    }
}

// Filtro por prioridad de tareas

function filtroPrioridad(pLista, pPrioridad) {
    let listaFiltrada = new Array();

    for (registro of pLista) {
        if (registro.prioridad.toLowerCase() == pPrioridad.toLowerCase()) {
            listaFiltrada.push(registro);
        }
    }
    return listaFiltrada;
}

// Pintar filtro por prioridad de tareas

function pintarPrioridad(event) {
    seccionTareas.innerHTML = '';
    let tipoPrioridad = event.target.value;
    if (tipoPrioridad != "") {
        pintarRegistros(filtroPrioridad(allTareas, tipoPrioridad));
    } else {
        pintarRegistros(allTareas);
    }
}

// Filtro por casilla de búsqueda

$(document).ready(function () {
    (function ($) {
        $('#buscarTarea').keyup(function () {

            var rastreator = new RegExp($(this).val(), 'i');

            $('#listaTareas li').hide();

            $('#listaTareas li').filter(function () {
                return rastreator.test($(this).text());
            }).show();
        })
    }(jQuery));

});

// Eliminar una tarea 

function eliminarTarea(event) {
    let idTarea = (event.target).parentNode.dataset.id;
    let indice = allTareas.findIndex(function (tarea) {
        return tarea.id == idTarea;
    })

    allTareas.splice(indice, 3);

    let tareaBorrada = document.getElementById('btnEliminar');
    tareaBorrada.parentNode.remove();
}


// Registros del inicio

pintarRegistros(allTareas);