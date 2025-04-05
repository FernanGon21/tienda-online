
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = [];

window.onload = () => {
  renderProductos();
  cargarFiltros();
  document.getElementById('buscar').addEventListener('input', renderProductos);
  document.getElementById('filtroCategoria').addEventListener('change', renderProductos);
  document.getElementById('filtroMarca').addEventListener('change', renderProductos);
  aplicarPersonalizacion();
};

function renderProductos() {
  const contenedor = document.getElementById('productos');
  const busqueda = document.getElementById('buscar').value.toLowerCase();
  const filtroCategoria = document.getElementById('filtroCategoria').value;
  const filtroMarca = document.getElementById('filtroMarca').value;
  contenedor.innerHTML = '';

  productos.filter(p => {
    return (
      p.nombre.toLowerCase().includes(busqueda) &&
      (filtroCategoria === '' || p.categoria === filtroCategoria) &&
      (filtroMarca === '' || p.marca === filtroMarca)
    );
  }).forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${p.imagen}" />
      <h3>${p.nombre}</h3>
      <p>Marca: ${p.marca}</p>
      <p>Categoría: ${p.categoria}</p>
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarCarrito('${p.nombre}')">Agregar</button>
    `;
    contenedor.appendChild(card);
  });
}

function cargarFiltros() {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  const marcas = [...new Set(productos.map(p => p.marca))];

  const filtroCategoria = document.getElementById('filtroCategoria');
  categorias.forEach(c => filtroCategoria.innerHTML += `<option>${c}</option>`);

  const filtroMarca = document.getElementById('filtroMarca');
  marcas.forEach(m => filtroMarca.innerHTML += `<option>${m}</option>`);
}

function agregarCarrito(nombre) {
  carrito.push(nombre);
  renderCarrito();
}

function renderCarrito() {
  const lista = document.getElementById('carrito');
  lista.innerHTML = '';
  carrito.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = item;
    lista.appendChild(li);
  });
}

function enviarPedido() {
  const ubicacion = prompt("Pega tu ubicación desde Google Maps:");
  const telefono = prompt("Tu número de WhatsApp:");
  const mensaje = encodeURIComponent(`Hola, quiero pedir: ${carrito.join(', ')}%0AMi ubicación: ${ubicacion}`);
  window.open(`https://wa.me/${telefono}?text=${mensaje}`);
}

function aplicarPersonalizacion() {
  const color = localStorage.getItem('color');
  const fuente = localStorage.getItem('fuente');
  const banner = localStorage.getItem('banner');
  if (color) document.documentElement.style.setProperty('--color', color);
  if (fuente) document.body.style.fontFamily = fuente;
  if (banner) {
    const img = document.createElement('img');
    img.src = banner;
    img.style.width = "100%";
    document.body.insertBefore(img, document.body.firstChild);
  }
}
