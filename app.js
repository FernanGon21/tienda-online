let productos = [];
let carrito = [];
const adminPassword = "admin123";

function renderProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  const filtro = document.getElementById("categoria-filtro").value.toLowerCase();
  const buscador = document.getElementById("buscador").value.toLowerCase();

  productos
    .filter(p =>
      (filtro === "" || p.categoria.toLowerCase() === filtro) &&
      (p.nombre.toLowerCase().includes(buscador))
    )
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <img src="${p.imagen}" width="100%" />
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button onclick="agregarAlCarrito('${p.nombre}')">Agregar al carrito</button>
      `;
      contenedor.appendChild(div);
    });
}

function agregarAlCarrito(nombre) {
  carrito.push(nombre);
  document.getElementById("carrito-contador").textContent = carrito.length;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("oculto");
}

function abrirAgregarProducto() {
  document.getElementById("form-agregar-producto").classList.remove("oculto");
}

function abrirPersonalizacion() {
  document.getElementById("form-personalizar").classList.remove("oculto");
}

function guardarProducto() {
  const nombre = document.getElementById("nombre-producto").value;
  const precio = document.getElementById("precio-producto").value;
  const categoria = document.getElementById("categoria-producto").value;
  const imagen = URL.createObjectURL(document.getElementById("imagen-producto").files[0]);

  productos.push({ nombre, precio, categoria, imagen });
  renderProductos();
  actualizarCategorias();
  cerrarModal("form-agregar-producto");
}

function actualizarCategorias() {
  const select = document.getElementById("categoria-filtro");
  const categorias = [...new Set(productos.map(p => p.categoria))];
  select.innerHTML = '<option value="">Todas las categorías</option>';
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function verificarAdmin() {
  const pass = document.getElementById("admin-pass").value;
  if (pass === adminPassword) {
    document.getElementById("admin-login").classList.add("oculto");
    document.getElementById("admin-panel").classList.remove("oculto");
  } else {
    alert("Contraseña incorrecta");
  }
}

function aplicarPersonalizacion() {
  const color = document.getElementById("color-primario").value;
  const fuente = document.getElementById("fuente").value;
  const tamano = document.getElementById("tamano-fuente").value;
  const fondoInput = document.getElementById("fondo-imagen");

  document.body.style.setProperty("--color-primario", color);
  document.body.style.fontFamily = fuente;
  document.body.style.fontSize = tamano + "px";

  if (fondoInput.files[0]) {
    const fondo = URL.createObjectURL(fondoInput.files[0]);
    document.body.style.backgroundImage = `url('${fondo}')`;
    document.body.style.backgroundSize = "cover";
  }

  cerrarModal("form-personalizar");
}

document.getElementById("carrito-btn").onclick = () => {
  document.getElementById("carrito-modal").classList.remove("oculto");
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  // Obtener ubicación automáticamente
  obtenerUbicacion();
};

document.getElementById("enviar-whatsapp").onclick = () => {
  const tel = document.getElementById("telefono").value;
  const ubicacion = document.getElementById("ubicacion").value;
  if (!tel || !ubicacion) return alert("Faltan datos");
  const mensaje = `Hola! Quiero pedir: ${carrito.join(", ")}\nMi número: ${tel}\nUbicación: ${ubicacion}`;
  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};

document.getElementById("admin-btn").onclick = () => {
  document.getElementById("admin-modal").classList.remove("oculto");
};

document.getElementById("buscador").addEventListener("input", renderProductos);
document.getElementById("categoria-filtro").addEventListener("change", renderProductos);

function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const link = `https://www.google.com/maps?q=${lat},${lon}`;
      const input = document.getElementById("ubicacion");
      if (input) input.value = link;
    }, (error) => {
      console.error("Error de geolocalización:", error);
      alert("No se pudo obtener tu ubicación. Asegúrate de permitir el acceso en el navegador.");
    });
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}