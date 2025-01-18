//Variables globales
const date_25 = "1 de febrero de 2025 <br> 3:00 pm <br> Prados De La Calleja";
const lugar_25 = "https://www.google.com/maps/place/Prados+de+la+Calleja/@4.7112811,-74.0521992,812m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f851835852847:0xfbcdd12196271aff!8m2!3d4.7112758!4d-74.0496243!16s%2Fg%2F11jgjhkz3l?hl=es&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";
const date_2 = "2 de febrero de 2025 <br> 2:00 pm <br> Conjunto Plaza Real Salitre ";
const lugar_2 = "https://www.google.com/maps/place/Conjunto+Residencial+Plaza+Real+Salitre/@4.6549293,-74.1095146,812m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f9b91286f5663:0xa2336b9d7a550572!8m2!3d4.654924!4d-74.1069397!16s%2Fg%2F11c4y3m2f3?hl=es&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";
const date_23 = "Por confirmar <br> Hora por confirmar <br> Hotel Palma Verde";
const lugar_23="https://www.google.com/maps/place/Hotel+Campestre+Palma+Verde/@4.1850865,-73.5863714,813m/data=!3m1!1e3!4m9!3m8!1s0x8e3e2d569380b169:0xb1968bcf54fc75a5!5m2!4m1!1i2!8m2!3d4.1850812!4d-73.5837965!16s%2Fg%2F11rj5l2ldj?hl=es&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
let invitados = [];
let productos = [];
let sel_ping_der = '';

//Cargar invitados del Json como función asíncrona
function cargarInvitados() {
    fetch("invitados.json")
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            invitados = resultado;
        });
}

//Detalles
function detalleInvitacion(detalles){
    //Lista de Divs
    let divs = "";
    //Fechas invitadas
    for(detalle of detalles){
        if(detalle === 25){
            divs += `<div>${date_25}  <br><br> <a href="${lugar_25}" target="_blank"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #ffbd59;"></i></a></div>`;
        }
        if(detalle === 2){
            divs += `<div>${date_2} <br><br> <a href="${lugar_2}" target="_blank"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #ffbd59;"></i></a></div>`;
        }
        if(detalle === 23){
            divs += `<div>${date_23}<br><br> <a href="${lugar_23}" target="_blank"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #ffbd59;"></i></a></div>`;
        }
    }
    return divs;
}

//Mostrar Invitación
function mostrarInvitacion() {
    // Invitar a la sección de invitación
    const invitacion = document.getElementById("invitacion");
    invitacion.innerHTML = ""; // Limpiar contenido previo

    // Obtener el nombre del invitado
    const nombre = document.getElementById("search-input").value.trim().toLowerCase().replace(/\s+/g, '');
    const invitado = invitados.find((invitado) =>
        invitado.nombre.toLowerCase().replace(/\s+/g, '') === nombre
    );

    if (invitado) {
        // Crear y agregar el nombre del invitado
        const nombreDiv = document.createElement("div");
        nombreDiv.textContent = invitado.nombre;
        nombreDiv.classList.add("titulo-principal", "borde");
        nombreDiv.id = "nombre-invitado";
        invitacion.appendChild(nombreDiv);

        // Crear y agregar el título
        const tituloDiv = document.createElement("div");
        tituloDiv.textContent = "¡Estás invitad@!";
        tituloDiv.classList.add("titulo-principal", "borde");
        invitacion.appendChild(tituloDiv);

        //Agregar detalles
        const detallesDiv = document.createElement("div");
        detallesDiv.classList.add("sub-titulo");
        detallesDiv.innerHTML = detalleInvitacion(invitado.fechas);
        console.log(detalleInvitacion(invitado.fechas))
        invitacion.appendChild(detallesDiv);
    } else {
        alert("Invitado no encontrado");
    }
}

//Mostrar regalos
function mostrarRegalos() {
    // Obtener el nombre del invitado
    const nombre = document.getElementById("search-input").value.trim().toLowerCase().replace(/\s+/g, '');
    const invitado = invitados.find((invitado) =>
        invitado.nombre.toLowerCase().replace(/\s+/g, '') === nombre
    );
    if (invitado) {
        //Lista regalos
        let = url = '';
        if(invitado.grupo === 'Amigos'){
            url ='https://firestore.googleapis.com/v1/projects/matias-b7918/databases/(default)/documents/regalo-amigos/';
        }
        else if(invitado.grupo === 'Familia'){
            url = 'https://firestore.googleapis.com/v1/projects/matias-b7918/databases/(default)/documents/regalo-familia/';
        }
        //Colección
        if(url !== ''){
            getCollection(url);
        }
    }
}

//Tabla de regalos
function tablaRegalosAmigos(productos, url) {
    // Crear la tabla
    const table = document.createElement('table');
    table.id = 'productosTabla';

    // Crear el thead
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    // Definir los encabezados
    const headers = ['Producto', 'Marca', 'Cantidad'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    // Crear el tbody
    const tbody = document.createElement('tbody');

    // Llenar el tbody con datos
    productos.forEach((producto, index) => {
        const tr = document.createElement('tr');

        // Añadir celdas para producto y marca
        const tdProducto = document.createElement('td');
        tdProducto.textContent = producto.producto;
        tr.appendChild(tdProducto);

        const tdMarca = document.createElement('td');
        tdMarca.textContent = producto.Marca;
        tr.appendChild(tdMarca);

        // Crear celda para cantidad con botones
        const tdCantidad = document.createElement('td');
        const cantidadSpan = document.createElement('span');
        cantidadSpan.textContent = producto.cantidad;

        const botonMas = document.createElement('i');
        botonMas.className = 'fa-solid fa-circle-plus';
        botonMas.style.cursor = 'pointer';
        botonMas.onclick = () => ajustarCantidad(producto.id,producto.producto, producto.Marca, 1, url);

        const botonMenos = document.createElement('i');
        botonMenos.className = 'fa-solid fa-circle-minus';
        botonMenos.style.cursor = 'pointer';
        botonMenos.onclick = () => ajustarCantidad(producto.id,producto.producto, producto.Marca, -1,url);

        tdCantidad.appendChild(botonMenos);
        tdCantidad.appendChild(cantidadSpan);
        tdCantidad.appendChild(botonMas);
        tr.appendChild(tdCantidad);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    //Título de la tabla
    const tituloTabla = document.getElementById('titulo-regalos');
    tituloTabla.classList.add('aparecer');
    tituloTabla.style.display = "flex";
    // Agregar la tabla al contenedor en el DOM
    const container = document.getElementById('tablaAmigos');
    container.innerHTML = '';
    container.appendChild(table);
    container.classList.add('aparecer');
    container.style.display = "flex";
}

// Función para ajustar la cantidad
function ajustarCantidad(id,producto, marca, cambio,url) {
    let itemFind = null;
    // Encontrar el producto correspondiente y ajustar la cantidad
    productos.forEach(item => {
        if (item.producto === producto && item.Marca === marca) {
            item.cantidad = Math.max(0, item.cantidad + cambio);
            itemFind = item;
        }
    });
    tablaRegalosAmigos(productos,url);

    // Actualizar la base de datos
    fetch(`${url}${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                id: {
                    integerValue: itemFind.id
                },
                Marca: {
                    stringValue: itemFind.Marca
                },
                producto: {
                    stringValue: itemFind.producto
                },
                cantidad: {
                    integerValue: itemFind.cantidad
                }
            }
        })
    })
}

//Función para obtener colecciones
function getCollection(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data = data.documents
        const transformedData = data.map(doc => {
            console.log('Datos crudos:', doc);
            return {
                id: doc.fields.id.integerValue,
                producto: doc.fields.producto.stringValue,
                Marca: doc.fields.Marca.stringValue,
                cantidad: parseInt(doc.fields.cantidad.integerValue, 10)
            };
        });
        productos = transformedData;
        tablaRegalosAmigos(transformedData,url);
    })
    .catch(error => {
        console.error('Error al leer de Realtime Database:', error);
    });
}

//Visualización
function visualizacion(){
    if(sel_ping_der){
        mostrarRegalos();
    }else{
        mostrarInvitacion();
    }
}

//Inicio
function inicio(){
    const nubes = document.getElementById("nubes");
    const invitacion = document.getElementById("invitacion");
    const tetero = document.getElementById("tetero");
    nubes.style.display = "none";
    invitacion.style.display = "none";
    tetero.style.display = "none";
    const cueva = document.getElementById("cueva");
    cueva.style.display = "none";
    const tablaAmigos = document.getElementById("tablaAmigos");
    tablaAmigos.style.display = "none";
    const tituloTabla = document.getElementById('titulo-regalos');
    tituloTabla.style.display = "none";

    //Mostrar elementos iniciales
    const montanias =   document.getElementById("montanias");
    const hielos = document.getElementById("hielos");
    const titulo = document.getElementById("titulo");
    const estrellas = document.getElementById("estrellas");
    const sombras = document.querySelectorAll(".sombra, .sombra-der");
    const pinguinoIzq = document.querySelector("#pinguino-izq img");
    const pinguinoDer = document.querySelector("#pinguino-der img");
    // Eliminar todas las clases de los elementos
    montanias.className = '';
    hielos.className = '';
    titulo.className = '';
    estrellas.className = '';
    pinguinoIzq.className = '';
    pinguinoDer.className = '';
    //Mostrar elementos
    montanias.style.display = "flex";
    hielos.style.display = "flex";
    titulo.style.display = "flex";
    estrellas.style.display = "flex";
    pinguinoIzq.style.display = "flex";
    pinguinoDer.style.display = "flex";
    sombras.forEach((elemento) => {
        elemento.style.display = "flex";
    });
}

//Event loader
document.addEventListener("DOMContentLoaded", () => {

    //Cargar JSON
    cargarInvitados()

    // Desaparición de elementos
    const pinguinoIzq = document.querySelector("#pinguino-izq img");
    const pinguinoDer = document.querySelector("#pinguino-der img");
    const montanias = document.getElementById("montanias");
    const hielos = document.getElementById("hielos");
    const titulo = document.getElementById("titulo");
    const estrellas = document.getElementById("estrellas");
    const sombras = document.querySelectorAll(".sombra, .sombra-der");

    pinguinoIzq.addEventListener("click", () => {
        const nombre = document.getElementById("search-input").value;
        if(nombre !== ''){
            sel_ping_der = false;
            pinguinoIzq.classList.add("desaparecer");
            pinguinoDer.classList.add("desaparecer");
            montanias.classList.add("desaparecer");
            hielos.classList.add("desaparecer");
            titulo.classList.add("desaparecer");
    
            // Desaparecer div con clases sombra
            sombras.forEach((elemento) => {
                elemento.style.display = "none";
            });
    
            //Aparecer las nubes
            const nubes = document.getElementById("nubes");
            const invitacion = document.getElementById("invitacion");
            const tetero = document.getElementById("tetero");
            nubes.style.display = "flex";
            nubes.classList.add("aparecer-arriba-class");
            invitacion.style.display = "flex";
            invitacion.style.animation = "aparecer 1s ease-in forwards";
            tetero.style.display = "flex";
            tetero.style.animation = "aparecer 1s ease-in forwards";
    
            //Botón de buscar
            const buscarBtn = document.getElementById("search-btn");
            buscarBtn.addEventListener("click", visualizacion);
            mostrarInvitacion();
        }else{
            alert("Ingresa un nombre de invitado");
        }
    });

    pinguinoDer.addEventListener("click", () => {
        const nombre = document.getElementById("search-input").value;
        if(nombre !== ''){
            sel_ping_der = true;
            const cueva = document.getElementById("cueva");
            cueva.classList.add('aparecer');
            montanias.classList.add("elemento-zoom");
            estrellas.classList.add("elemento-zoom");
            pinguinoIzq.classList.add("desaparecer");
            pinguinoDer.classList.add("desaparecer");
            hielos.classList.add("elemento-zoom");
            titulo.classList.add("desaparecer");

            // Desaparecer div con clases sombra
            sombras.forEach((elemento) => {
                elemento.style.display = "none";
            });

            //Aparecer la cueva
            cueva.style.display = "flex";

            //Botón de buscar
            const buscarBtn = document.getElementById("search-btn");
            buscarBtn.addEventListener("click", visualizacion);
            mostrarRegalos();
        }else{
            alert("Ingresa un nombre de invitado");
        }
    });
});
