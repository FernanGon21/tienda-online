let productos = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarLogin() {
  document.getElementById("login-admin").classList.remove("oculto");
}

function loginAdmin() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("contrasena").value;
  if (user === "admin" && pass === "1234") {
    document.getElementById("login-admin").classList.add("oculto");
    document.getElementById("admin-panel").classList.remove("oculto");
    mostrarProductos();
  } else {
    alert("Credenciales incorrectas");
  }
}

function guardarProducto(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value;
  const stock = parseInt(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value;
  const editIndex = document.getElementById("edit-index").value;

  const producto = { nombre, precio, categoria, stock, imagen };

  if (editIndex === "") {
    productos.push(producto);
  } else {
    productos[editIndex] = producto;
    document.getElementById("edit-index").value = "";
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
  document.getElementById("form-producto").reset();
}

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach((prod, index) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${prod.imagen}" alt="${prod.nombre}" width="100%">
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <p>Categoría: ${prod.categoria}</p>
        <p>Stock: ${prod.stock}</p>
        <button onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </div>
    `;
  });
}

function editarProducto(index) {
  const p = productos[index];
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("precio").value = p.precio;
  document.getElementById("categoria").value = p.categoria;
  document.getElementById("stock").value = p.stock;
  document.getElementById("imagen").value = p.imagen;
  document.getElementById("edit-index").value = index;
}

function eliminarProducto(index) {
  if (confirm("¿Eliminar este producto?")) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
  }
}
