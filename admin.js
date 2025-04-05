
const PASSWORD = "admin123";

function login() {
  const pass = document.getElementById('password').value;
  if (pass === PASSWORD) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    mostrarProductosAdmin();
  } else {
    alert("Contraseña incorrecta.");
  }
}

function agregarProducto() {
  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const categoria = document.getElementById('categoria').value;
  const precio = document.getElementById('precio').value;
  const stock = document.getElementById('stock').value;
  const imagenFile = document.getElementById('imagen').files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.push({ nombre, marca, categoria, precio, stock, imagen: reader.result });
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductosAdmin();
    alert("Producto agregado");
  };
  reader.readAsDataURL(imagenFile);
}

function mostrarProductosAdmin() {
  const cont = document.getElementById('listaProductos');
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  cont.innerHTML = '';
  productos.forEach((p, i) => {
    cont.innerHTML += `
      <div>
        <b>${p.nombre}</b> - ${p.categoria} - ${p.marca}
        <button onclick="eliminarProducto(${i})">Eliminar</button>
      </div>
    `;
  });
}

function eliminarProducto(i) {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.splice(i, 1);
  localStorage.setItem('productos', JSON.stringify(productos));
  mostrarProductosAdmin();
}

function guardarPersonalizacion() {
  const color = document.getElementById('color').value;
  const fuente = document.getElementById('fuente').value;
  const bannerFile = document.getElementById('banner').files[0];

  if (color) localStorage.setItem('color', color);
  if (fuente) localStorage.setItem('fuente', fuente);

  if (bannerFile) {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('banner', reader.result);
      alert("Personalización guardada");
    };
    reader.readAsDataURL(bannerFile);
  } else {
    alert("Personalización guardada");
  }
}
