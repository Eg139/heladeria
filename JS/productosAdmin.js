const productosJson = "../../archivos/productos.json"

document.addEventListener("DOMContentLoaded",function() {

  cargarProductosAdmin(productosJson)
    
})



  function cargarProductosAdmin(archivo) {
    fetch(archivo)
      .then(response => response.json())
      .then(data => mostrarProductosAdmin(data.productos))
      .catch(error => console.error('Error al obtener los datos:', error));
  }
  
  function mostrarProductosAdmin(productos) {
    const tablaBody = document.querySelector('#tablaProductos tbody');
    
    productos.forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
      <td><input type="checkbox" class="form-check-input"></td>
      <th>${producto.id}</th>
      <td>${producto.nombre}</td>
      <td style="max-width: 200px;">${producto.descripcion}</td>
      <td>${producto.disponible ? 'Sí' : 'No'}</td>
      <td>$${producto.precio.toFixed(2)}</td>          
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary" onclick="editarProducto('${producto.id}')">Editar</button>
          <button type="button" class="btn btn-danger" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
        </div>
      </td>
      `;
      tablaBody.appendChild(fila);
    });
  }

  