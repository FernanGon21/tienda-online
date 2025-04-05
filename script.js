let carrito = [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach((prod, index) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">Agregar al carrito</button>
      </div>
    `;
  });
}

function agregarProducto() {
  const nombre = document.getElementById("nuevo-nombre").value;
  const precio = parseFloat(document.getElementById("nuevo-precio").value);
  const imagen = document.getElementById("nuevo-imagen").value;

  if (!nombre || !precio || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  productos.push({ nombre, precio, imagen });
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");
  const cantidad = document.getElementById("cantidad-carrito");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, i) => {
    lista.innerHTML += `<li>${item.nombre} - $${item.precio} 
      <button onclick="eliminarDelCarrito(${i})">X</button></li>`;
    suma += item.precio;
  });

  total.textContent = suma;
  cantidad.textContent = carrito.length;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function mostrarCarrito() {
  document.getElementById("carrito").classList.toggle("oculto");
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function enviarPedido() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const ubicacion = document.getElementById("ubicacion").value;

  if (!nombre || !telefono || !ubicacion || carrito.length === 0) {
    alert("Completa todos los campos y agrega productos");
    return;
  }

  let mensaje = `Hola, soy *${nombre}*.
Quiero pedir:
`;
  carrito.forEach((item, i) => {
    mensaje += `${i + 1}. ${item.nombre} - $${item.precio}\n`;
  });
  let total = carrito.reduce((sum, p) => sum + p.precio, 0);
  mensaje += `\nTotal: $${total}\nUbicación: ${ubicacion}\nContacto: ${telefono}`;
  const numero = "521XXXXXXXXXX"; // Reemplaza con tu número
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function iniciarSesionAdmin() {
  const clave = prompt("Ingrese la clave de administrador:");
  if (clave === "admin123") {
    document.getElementById("admin-panel").classList.remove("oculto");
  } else {
    alert("Clave incorrecta");
  }
}

function mostrarRegistro() {
  document.getElementById("registro").classList.toggle("oculto");
}

function registrarCliente() {
  const nombre = document.getElementById("reg-nombre").value;
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;

  if (!nombre || !email || !pass) {
    alert("Completa todos los campos");
    return;
  }

  alert("¡Registro exitoso!");
  document.getElementById("registro").classList.add("oculto");
}

window.onload = mostrarProductos;
