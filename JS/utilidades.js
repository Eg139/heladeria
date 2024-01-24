const heladosJson = '../../../archivos/sabores.json'
const productosJson = "../../../archivos/productos.json"

document.addEventListener("DOMContentLoaded",function() {

    cargarDatosHelados(heladosJson)
    //cargarDatosProductos(productosJson)
})


function cargarDatosHelados(archivo) {
    fetch(archivo)
      .then(response => response.json())
      .then(data => mostrarTodosHelados(data.sabores_helado))
      .catch(error => console.error('Error al obtener los datos:', error));
  }
  

  function mostrarHeladosEnLista(sabores) {
    const lista = document.createElement('ol'); // Crear una lista ordenada
  
    sabores.forEach(sabor => {
      if ((sabor.disponible === 'si' || sabor.disponible === 'SI') ) {
        const listItem = document.createElement('li'); // Crear un elemento de lista
  
        // Construir el contenido del elemento de lista
        listItem.innerHTML = `
          <strong>Nombre:</strong> ${sabor.nombre}<br>
          <strong>Descripción:</strong> ${sabor.descripcion}<br>
          <strong>Disponible:</strong> ${sabor.disponible ? 'Sí' : 'No'}<br>
          <strong>Precio:</strong> $${sabor.precio.toFixed(2)}
        `;
  
        lista.appendChild(listItem); // Agregar el elemento de lista a la lista ordenada
      }
    });
  
    const contenedorLista = document.getElementById('listaSabores'); // Obtener el contenedor donde se agregará la lista
    contenedorLista.innerHTML = ''; // Limpiar el contenido del contenedor
    contenedorLista.appendChild(lista); // Agregar la lista ordenada al contenedor
  }

function mostrarTodosHelados(sabores) {
  const contenedorLista = document.getElementById('listaSabores');
  contenedorLista.innerHTML = ''; // Limpiar el contenido del contenedor
  var saboresPorTipo = {}; // Objeto para almacenar sabores agrupados por tipo

  // console.log(sabores)
  sabores.forEach(sabor => {
    // console.log(sabor)
    if (sabor.disponible === true) {
      if (!saboresPorTipo[sabor.tipo]) {
        saboresPorTipo[sabor.tipo] = [];
      }
      saboresPorTipo[sabor.tipo].push(sabor);
    }
  });
  
  for (const tipo in saboresPorTipo) {
    
    const saboresDelTipo = saboresPorTipo[tipo];

    const tituloTipo = document.createElement('h3');
    tituloTipo.textContent = tipo;
    contenedorLista.appendChild(tituloTipo);

    const lista = document.createElement('ul');
    // console.log(saboresDelTipo)
    saboresDelTipo.forEach(sabor => {
      const listItem = document.createElement('li');

      if (sabor.sintacc) {
        const icono = document.createElement('img');
        icono.src = "../../imagenes/icons/gluttenfree.ico";
        icono.style.width = "1.5rem";
  
        const nombre = document.createElement('strong');
        nombre.textContent = `${sabor.nombre} `;
  
        listItem.appendChild(nombre);
        listItem.appendChild(icono); // Agregar el icono al elemento de la lista
  
        const descripcion = document.createElement('div');
        descripcion.textContent = `Descripción: ${sabor.descripcion}`;
        listItem.appendChild(descripcion);
      }else{

        const nombre = document.createElement('strong');
        nombre.textContent = `Nombre: ${sabor.nombre} `; 
        listItem.appendChild(nombre);

        const descripcion = document.createElement('div');
        descripcion.textContent = `Descripción: ${sabor.descripcion}`;
        listItem.appendChild(descripcion);
      }


      lista.appendChild(listItem);
    });

    contenedorLista.appendChild(lista);
  }
}
  
  


  function cargarDatosProductos(archivo) {
    fetch(archivo)
      .then(response => response.json())
      .then(data => mostrarProductosCard(data.productos))
      .catch(error => console.error('Error al obtener los datos:', error));
  }
  
  function mostrarProductosCard(productos) {
    const productosContainer = document.getElementById('productosContainer');
    
    productos.forEach(producto => {
      const card = `
        <div class="col-md-4 mb-2">
          <div class="card">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
            </div>
          </div>
        </div>
      `;
      productosContainer.innerHTML += card;
    });
  }

  