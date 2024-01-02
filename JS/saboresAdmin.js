const heladosJson = '../../archivos/sabores.json'

document.addEventListener("DOMContentLoaded",function() {

  cargarHeladosAdmin(heladosJson)
    
})


function cargarHeladosAdmin(archivo) {
    fetch(archivo)
      .then(response => response.json())
      .then(data => mostrarHeladosAdmin(data.sabores_helado))
      .catch(error => console.error('Error al obtener los datos:', error));
  }
  
  function mostrarHeladosAdmin(sabores) {
    const tablaBody = document.querySelector('#tablaSabores tbody');
  
    sabores.forEach(sabor => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td><input type="checkbox" class="form-check-input"></td>
          <th>${sabor.id}</th>
          <td>${sabor.nombre}</td>
          <td style="max-width: 200px;">${sabor.descripcion}</td>
          <td>${sabor.disponible ? 'Sí' : 'No'}</td>
          <td>$${sabor.precio.toFixed(2)}</td>          
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary" onclick="editarSabor('${sabor.id}')">Editar</button>
              <button type="button" class="btn btn-danger" onclick="eliminarSabor('${sabor.id}')">Eliminar</button>
            </div>
          </td>

      `;
      tablaBody.appendChild(fila);
  });
  }