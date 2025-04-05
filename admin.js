
function login() {
  const pass = document.getElementById('password').value;
  if (pass === 'admin123') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('admin').style.display = 'block';
    mostrarProductosAdmin();
  } else {
    alert('Contraseña incorrecta');
  }
}

function guardarProducto() {
  let productos = JSON.parse(localStorage.getItem('productos') || '[]');
  const idEdit = document.getElementById('edit-id').value;
  const nuevo = {
    id: idEdit ? parseInt(idEdit) : Date.now(),
    nombre: document.getElementById('nombre').value,
    precio: parseFloat(document.getElementById('precio').value),
    categoria: document.getElementById('categoria').value,
    stock: parseInt(document.getElementById('stock').value),
    imagen: document.getElementById('preview').src,
    marca: document.getElementById('marca').value
  };

  if (idEdit) {
    productos = productos.map(p => p.id === nuevo.id ? nuevo : p);
  } else {
    productos.push(nuevo);
  }

  localStorage.setItem('productos', JSON.stringify(productos));
  mostrarProductosAdmin();
  limpiarForm();
}

function mostrarProductosAdmin() {
  const lista = document.getElementById('lista-productos');
  const productos = JSON.parse(localStorage.getItem('productos') || '[]');
  lista.innerHTML = '';
  productos.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `${p.nombre} (${p.categoria}) <button onclick="editar(${p.id})">Editar</button> <button onclick="eliminar(${p.id})">Eliminar</button>`;
    lista.appendChild(li);
  });
}

function editar(id) {
  const productos = JSON.parse(localStorage.getItem('productos') || '[]');
  const p = productos.find(p => p.id === id);
  if (p) {
    document.getElementById('edit-id').value = p.id;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('precio').value = p.precio;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('stock').value = p.stock;
    document.getElementById('marca').value = p.marca;
    document.getElementById('preview').src = p.imagen;
  }
}

function eliminar(id) {
  let productos = JSON.parse(localStorage.getItem('productos') || '[]');
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));
  mostrarProductosAdmin();
}

document.getElementById('imagen').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = () => document.getElementById('preview').src = reader.result;
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('banner').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = () => document.getElementById('preview-banner').src = reader.result;
  reader.readAsDataURL(e.target.files[0]);
});

function guardarBanner() {
  const banners = JSON.parse(localStorage.getItem('banners') || '[]');
  banners.push(document.getElementById('preview-banner').src);
  localStorage.setItem('banners', JSON.stringify(banners));
  alert('Banner agregado');
}

function guardarPersonalizacion() {
  const config = {
    nombre: document.getElementById('nombre-tienda').value,
    fondo: document.getElementById('color-fondo').value,
    texto: document.getElementById('color-texto').value,
    fuente: document.getElementById('fuente').value
  };
  localStorage.setItem('config', JSON.stringify(config));
  alert('Personalización guardada');
}

function limpiarForm() {
  document.getElementById('edit-id').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('stock').value = '';
  document.getElementById('marca').value = '';
  document.getElementById('preview').src = '';
}
