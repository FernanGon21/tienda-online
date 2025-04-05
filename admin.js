
function login() {
  const pass = document.getElementById("password").value;
  if (pass === "admin") {
    document.getElementById("login").style.display = "none";
    document.getElementById("admin").style.display = "block";
    cargarProductos();
    cargarPersonalizacion();
  } else {
    alert("Contraseña incorrecta");
  }
}

function cargarProductos() {
  const lista = document.getElementById("lista-productos");
  lista.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");

  productos.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nombre} (${p.categoria}) 
    <button onclick="editar(${p.id})">Editar</button>
    <button onclick="eliminar(${p.id})">Eliminar</button>`;
    lista.appendChild(li);
  });
}

function guardarProducto() {
  const id = document.getElementById("edit-id").value || Date.now();
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("marca").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value;
  const stock = parseInt(document.getElementById("stock").value);
  const imagenInput = document.getElementById("imagen");

  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const index = productos.findIndex(p => p.id == id);

  const reader = new FileReader();
  reader.onload = () => {
    const imagen = imagenInput.files.length ? reader.result : (productos[index]?.imagen || "");
    const producto = { id, nombre, marca, precio, categoria, stock, imagen };

    if (index >= 0) {
      productos[index] = producto;
    } else {
      productos.push(producto);
    }
    localStorage.setItem("productos", JSON.stringify(productos));
    limpiarFormulario();
    cargarProductos();
  };
  if (imagenInput.files.length) {
    reader.readAsDataURL(imagenInput.files[0]);
  } else {
    reader.onload();
  }
}

function editar(id) {
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const p = productos.find(p => p.id === id);
  document.getElementById("edit-id").value = p.id;
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("marca").value = p.marca;
  document.getElementById("precio").value = p.precio;
  document.getElementById("categoria").value = p.categoria;
  document.getElementById("stock").value = p.stock;
  document.getElementById("preview").src = p.imagen;
}

function eliminar(id) {
  let productos = JSON.parse(localStorage.getItem("productos") || "[]");
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductos();
}

function limpiarFormulario() {
  document.getElementById("edit-id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("preview").src = "";
}

function guardarBanner() {
  const bannerInput = document.getElementById("banner");
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("banner", reader.result);
  };
  reader.readAsDataURL(bannerInput.files[0]);
}

function guardarPersonalizacion() {
  const nombre = document.getElementById("nombre-tienda").value;
  const fondo = document.getElementById("color-fondo").value;
  const texto = document.getElementById("color-texto").value;
  const fuente = document.getElementById("fuente").value;
  const config = { nombre, fondo, texto, fuente };
  localStorage.setItem("personalizacion", JSON.stringify(config));
  alert("Estilo guardado.");
}

function cargarPersonalizacion() {
  const config = JSON.parse(localStorage.getItem("personalizacion") || "{}");
  if (config.nombre) document.title = config.nombre;
}
