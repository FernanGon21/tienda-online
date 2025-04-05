
let productos = [];

if (localStorage.getItem("productos")) {
  productos = JSON.parse(localStorage.getItem("productos"));
  iniciar();
} else {
  fetch('productos.json')
    .then(res => res.json())
    .then(data => {
      productos = data;
      localStorage.setItem("productos", JSON.stringify(productos));
      iniciar();
    });
}

function iniciar() {
  mostrarProductos(productos);
  llenarFiltros();
}

function mostrarProductos(lista) {
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p>Categoría: ${p.categoria}</p>
      <p>Marca: ${p.marca || 'Sin marca'}</p>
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;
    cont.appendChild(div);
  });
  cargarBanners();
  aplicarPersonalizacion();
}

function cargarBanners() {
  const bannerData = JSON.parse(localStorage.getItem('banners') || '[]');
  const cont = document.getElementById('banners');
  cont.innerHTML = '';
  bannerData.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '100%';
    cont.appendChild(img);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    carrito.push(producto);
    producto.stock--;
    mostrarProductos(productos);
    actualizarCarrito();
    localStorage.setItem("productos", JSON.stringify(productos));
  }
}

let carrito = [];

function actualizarCarrito() {
  const ul = document.getElementById('carrito');
  ul.innerHTML = '';
  carrito.forEach((p, i) => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio}`;
    ul.appendChild(li);
  });
}

function enviarPedido() {
  const tel = prompt('Número de WhatsApp (sin + ni espacios):');
  if (!tel) return;
  const pedido = carrito.map(p => `${p.nombre} ($${p.precio})`).join('%0A');
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  const mensaje = `Hola! Quiero pedir:%0A${pedido}%0ATotal: $${total}`;
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(prompt("Pega tu ubicación o dirección:"));
  const url = `https://wa.me/54${tel}?text=${mensaje}%0AUbicación: ${maps}`;
  window.open(url, '_blank');
}

function llenarFiltros() {
  const catSelect = document.getElementById('categoria');
  const marcas = new Set();
  const cats = new Set();

  productos.forEach(p => {
    cats.add(p.categoria);
    if (p.marca) marcas.add(p.marca);
  });

  cats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
  });

  const marcaFilter = document.createElement('select');
  marcaFilter.id = 'marca';
  const all = document.createElement('option');
  all.value = '';
  all.textContent = 'Todas las marcas';
  marcaFilter.appendChild(all);

  marcas.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    marcaFilter.appendChild(opt);
  });

  document.getElementById('busqueda').appendChild(marcaFilter);

  document.getElementById('buscar').addEventListener('input', filtrar);
  document.getElementById('categoria').addEventListener('change', filtrar);
  marcaFilter.addEventListener('change', filtrar);
}

function filtrar() {
  const texto = document.getElementById('buscar').value.toLowerCase();
  const cat = document.getElementById('categoria').value;
  const marca = document.getElementById('marca').value;

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (cat === '' || p.categoria === cat) &&
    (marca === '' || p.marca === marca)
  );

  mostrarProductos(filtrados);
}

function aplicarPersonalizacion() {
  const config = JSON.parse(localStorage.getItem('config'));
  if (config) {
    document.body.style.backgroundColor = config.fondo;
    document.body.style.color = config.texto;
    document.body.style.fontFamily = config.fuente;
    const titulo = document.getElementById('nombre-tienda');
    if (titulo) titulo.textContent = config.nombre;
  }
}
