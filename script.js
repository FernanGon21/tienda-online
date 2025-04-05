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


// Mostrar productos siempre, no solo para admins
mostrarProductos();

document.getElementById("imagen-local").addEventListener("change", function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("imagen").value = e.target.result;
  };
  if (file) reader.readAsDataURL(file);
});

function guardarPersonalizacion() {
  const fondo = document.getElementById("color-fondo").value;
  const texto = document.getElementById("color-texto").value;
  const fuente = document.getElementById("fuente").value;

  document.body.style.backgroundColor = fondo;
  document.body.style.color = texto;
  document.body.style.fontFamily = fuente;

  localStorage.setItem("personalizacion", JSON.stringify({ fondo, texto, fuente }));
}

function aplicarPersonalizacion() {
  const config = JSON.parse(localStorage.getItem("personalizacion"));
  if (config) {
    document.body.style.backgroundColor = config.fondo;
    document.body.style.color = config.texto;
    document.body.style.fontFamily = config.fuente;

    document.getElementById("color-fondo").value = config.fondo;
    document.getElementById("color-texto").value = config.texto;
    document.getElementById("fuente").value = config.fuente;
  }
}

aplicarPersonalizacion();

document.getElementById("banner-input").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    let banners = JSON.parse(localStorage.getItem("banners")) || [];
    banners.push(e.target.result);
    localStorage.setItem("banners", JSON.stringify(banners));
    mostrarBanners();
  };
  if (file) reader.readAsDataURL(file);
});

function mostrarBanners() {
  const cont = document.getElementById("banners");
  if (!cont) return;
  const banners = JSON.parse(localStorage.getItem("banners")) || [];
  cont.innerHTML = banners.map(img => `<img src="${img}">`).join("");
}

// Mostrar banners si existe contenedor
mostrarBanners();
