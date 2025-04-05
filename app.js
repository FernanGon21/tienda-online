
const productos = JSON.parse(localStorage.getItem("productos") || "[]");

function renderProductos() {
  const contenedor = document.getElementById("productos");
  const filtroCategoria = document.getElementById("categoria");
  const busqueda = document.getElementById("buscar").value.toLowerCase();
  contenedor.innerHTML = "";

  const categorias = [...new Set(productos.map(p => p.categoria))];
  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });

  const categoriaSeleccionada = filtroCategoria.value;

  const filtrados = productos.filter(p => {
    return (categoriaSeleccionada === "" || p.categoria === categoriaSeleccionada) &&
           p.nombre.toLowerCase().includes(busqueda);
  });

  filtrados.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" />
      <h3>${p.nombre}</h3>
      <p>Marca: ${p.marca}</p>
      <p>Precio: $${p.precio}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick='agregarAlCarrito(${p.id})'>Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

const carrito = [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    carrito.push(producto);
    producto.stock--;
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
    renderCarrito();
  }
}

function renderCarrito() {
  const ul = document.getElementById("carrito");
  ul.innerHTML = "";
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    ul.appendChild(li);
  });
}

function enviarPedido() {
  const ubicacion = prompt("Pega aquí tu ubicación de Google Maps:");
  const mensaje = encodeURIComponent(
    "Pedido:\n" +
    carrito.map(p => `${p.nombre} - $${p.precio}`).join("\n") +
    (ubicacion ? `\nUbicación: ${ubicacion}` : "")
  );
  window.open("https://wa.me/?text=" + mensaje);
}

document.getElementById("buscar").addEventListener("input", renderProductos);
document.getElementById("categoria").addEventListener("change", renderProductos);
renderProductos();
renderCarrito();
