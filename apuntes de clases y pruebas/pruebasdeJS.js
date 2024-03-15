//------------PRUEBA NUMERO 1 -----------------------------//

/*let opcion

do {
    opcion = pedirDatoNumerico("Ingrese opciones a continuacion, n1 solicitar un credito, n0 para salir de la aplicacion")
    if (opcion === 1) {
        let monto = pedirDatoNumerico("ingrese monto de credito a solicitar")
        let cantCuotas = pedirDatoNumerico("ingrese cantidad de cuotas")
        precioCuota = calcularMontoCuota(monto, cantCuotas)
        alert("debe pagar $" + precioCuota + " por cuota")
    }

} while (opcion !== 0);

function calcularMontoCuota(monto, cantCuotas) {
    switch (cantCuotas) {
        case 3:
            montoFinal = calcularMontoFinal(monto, 1.1)
        case 6:
            montoFinal = calcularMontoFinal(monto, 1.20)
        default:
            montoFinal = monto * 1.2
            break
    }
    return (montoFinal / cantCuotas).toFixed(2)
}

function calcularMontoFinal(monto, interes) {
    return monto * interes
}

function pedirDatoNumerico(mensaje) {
    let dato = Number(prompt(mensaje))
    return dato
}*/

// lo de arriba proximamente lo anexaré para la 3ra pre entrega o entrega final =)


/*//forEach recorre el arreglo con los objetos
productos.forEach((item) => {
    console.log(item.nombre);
    console.log(item.precio);
    console.log(item.id);
});

//find encuentra un elemento del arreglo dada la condicion
const producto = productos.find((item) => item.nombre === "camisa");
console.log(producto);


//filter filtra el arreglo dada una condicion
const filtrados = productos.filter((item) => item.precio > 300);
console.log(filtrados);

let nombre = prompt("Ingrese el nombre del producto a verificar");

while (nombre != "ESC") {
    const producto = productos.find((item) => item.nombre === nombre);

    if (producto) {
        let mensaje = `
Id: ${producto.id}
Nombre: ${producto.nombre}
Precio: $${producto.precio}
`;

        alert(mensaje);
    } else {
        alert("producto no identificado");
    }
    nombre = prompt("Ingrese el nombre del producto a verificar ó ingrese ESC para salir");
}
*/

/*//productos de la tienda
const productos = [
    { id: 1, nombre: "media", precio: 1000 },
    { id: 2, nombre: "gorra", precio: 750 },
    { id: 3, nombre: "zapato", precio: 1200 },
    { id: 4, nombre: "camisa", precio: 375 },
];
localStorage.setItem("carrito", JSON.stringify(productos))

//boton para eliminar el carrito
let eliminar = document.getElementById("eliminar");
let carrito = []

//me traigo el carrito del storage
let carritoStorage = localStorage.getItem("carrito");

const agregarCarrito = (id) => {
    let producto = productos.find((item) => item.id === id);
    let mensaje = `
      Id: ${producto.id}
      Nombre: ${producto.nombre}
      Precio: ${producto.precio}
`;

    alert(mensaje);
};

productos.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="color">
    <h2>Id: ${item.id}</h2>
    <p>Nombre: ${item.nombre}</p>
    <b>$${item.precio}</b>
    <button id="boton${item.id}">Agregar al carrito</button>
    </div>
  `;
    document.body.append(div);

    let boton = document.getElementById(`boton${item.id}`);
    boton.addEventListener("click", () => agregarCarrito(item.id));
});

//traemos el formulario
let formulario = document.getElementById("formulario");

//contenedor donde mostramos los productos
let contenedor = document.getElementById("contenedor");
const elCarrito = [];

//funcion para mostrar los productos en la pagina
const renderizar = (carrito) => {
    //antes de mostrar los productos en la pagina borramos el contenedor
    contenedor.innerHTML = "";
    carrito.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
      <h2>Id: ${item.id}</h2>
      <p>Nombre: ${item.nombre}</p>
      <b>$${item.precio}</b>
    `;
        contenedor.append(div);
    });
};

//agregamos el evento submit al formulario
formulario.addEventListener("submit", (e) => {
    //evitamos que el formulario se recargue
    e.preventDefault();

    //traemos los inputs
    let inputs = e.target.children;
    let nombre = inputs[0].value;
    let precio = inputs[1].value;

    //agregamos el nuevo producto al carrito
    Math.max(...carrito.map(item => item.id)) + 1
    carrito.push({ id: carrito.length + 1, nombre, precio });

    //mostramos el carrito en la pagina
renderizar(carrito);
});

/* /si hay carrito lo cargo si no coloco en el dom que no hay productos<<
if (carritoStorage) {
    carrito = JSON.parse(carritoStorage)
} else {
    let div = document.createElement("div")
    div.innerHTML = `
    <h2>No hay productos en el carrito</h2>
  `;

    document.body.append(div)
}
*/

// -------------- PRUEBA NUMERO 2 --------------------------------//

/*// Datos de productos
const productos = [
    { id: 1, nombre: 'Camiseta', precio: 25.99, stock: 20 },
    { id: 2, nombre: 'Jeans', precio: 49.99, stock: 20 },
    { id: 3, nombre: 'Zapatillas', precio: 79.99, stock: 20 }
];

localStorage.setItem('productos', JSON.stringify(productos));

function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            <button onclick="quitarDelCarrito(${producto.id})">Quitar del Carrito</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
}


// Llama a la función para mostrar los productos al cargar la página
mostrarProductos();

// Obtener los botones y el contenedor de productos
const botonAgregar = document.getElementById('agregarProducto');
const botonQuitar = document.getElementById('quitarProducto');
const contenedorProductos = document.getElementById('productos');

// Recuperar los datos del localStorage
const productosGuardados = localStorage.getItem('productos');
let productosObjeto = JSON.parse(localStorage.getItem('productos')) || [];

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productosObjeto));
}


// Ahora puedes usar "productosObjeto" en tu código
console.log(productosObjeto); // Verifica que los datos se hayan cargado correctamente

// Inicializa el carrito como un array vacío
const cart = []; 


// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
}


// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const indiceEncontradoCarrito = cart.findIndex(elemento => elemento.id === producto.id);

    if (indiceEncontradoCarrito === -1) {
        // Producto no está en el carrito, agrega uno
        producto.cantidad = 1;
        cart.push(producto);
    } else {
        // Producto ya está en el carrito, aumenta la cantidad
        cart[indiceEncontradoCarrito].cantidad += 1;
    }

    // Actualiza el stock en el objeto original
    const indiceProducto = productos.findIndex(p => p.id === producto.id);
    if (indiceProducto !== -1) {
        productos[indiceProducto].stock -= 1;
    }
}

    // Guarda los cambios en el localStorage
    guardarCarritoEnLocalStorage();
    mostrarProductos();

// Evento al hacer clic en "Agregar al carrito"
botonAgregar.addEventListener('click', () => {
    const productoDelCarrito = { id: 4, nombre: 'Nuevo Producto', precio: 25.99 };
    agregarAlCarrito(productoDelCarrito);
});

// Función para quitar un producto del carrito
function quitarDelCarrito(idProducto) {
    // Filtra los productos y crea un nuevo array sin el producto a quitar
    const nuevosProductos = productosObjeto.filter(producto => producto.id !== idProducto);
    // Actualiza la variable productosObjeto con el nuevo array
    productosObjeto = nuevosProductos;
    guardarCarritoEnLocalStorage(); // Actualiza el localStorage
    mostrarProductos(); // Vuelve a mostrar los productos en la página
}

// Evento al hacer clic en "Quitar del carrito"
botonQuitar.addEventListener('click', () => {
    const idProductoDelCarrito = 3; // ID del producto a quitar (ajústalo según tus necesidades)
    quitarDelCarrito(idProductoDelCarrito);
});


// Función para renderizar el carrito
function renderizarCarrito() {
};

*/

/* MODELO DE CARD 
<!-- Esqueleto de producto --
        <!-- <div class="card col" style="width: 18rem;" id="">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6>tipo</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <span>stock</span>
                <span>$</span>
                <form>
                    <label for="">Cantidad</label>
                    <input type="number" placeholder="1" id="">
                    <button class="btn btn-primary" id="">Agregar</button>
                </form>
            </div>
        </div> --
        */