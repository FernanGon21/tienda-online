let carrito = [];

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

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => eliminarDelCarrito(index);
    li.appendChild(btn);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma;
  cantidad.textContent = carrito.length;
}

function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.classList.toggle("oculto");
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function enviarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const ubicacion = document.getElementById("ubicacion").value.trim();

  if (!nombre || !telefono || !ubicacion || carrito.length === 0) {
    alert("Por favor completa todos los campos y agrega al menos un producto.");
    return;
  }

  let mensaje = `Hola, soy *${nombre}*.
Quiero hacer el siguiente pedido:

`;

  carrito.forEach((item, i) => {
    mensaje += `${i + 1}. ${item.nombre} - $${item.precio}
`;
  });

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  mensaje += `
Total: $${total}

Ubicación: ${ubicacion}
Contacto: ${telefono}`;

  const numeroVendedor = "521XXXXXXXXXX"; // Reemplaza con tu número de WhatsApp
  const url = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}
