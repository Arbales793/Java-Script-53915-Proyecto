class Producto {
    constructor(name, id, type, price, stock, description) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.price = price;
        this.stock = stock;
        this.description = description;
    }
}

// array de productos dinámico


// Array de productos base
const productosBase = [
    {
        name: "Jeans",
        id: "001",
        type: "Jeans",
        price: 45000,
        stock: 32,
        description: "Jeans Levis talle 44"
    },
    { name: "Gorra", id: "002", type: "Accesorios", price: 21000, stock: 19, description: "Gorra NY de hilo y algodón talle universal" },
    { name: "Zapatillas", id: "003", type: "Calzado", price: 37000, stock: 180, description: "Calzado urbano John Foos para uso diario talle 39" },
    { name: "Remera", id: "004", type: "Remeras", price: 45302, stock: 180, description: "Remera Jordan mangas cortas talle 40" }
]

// OR lógico para cargar local storage
const productos = JSON.parse(localStorage.getItem("productos")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

const agregarProducto = ({ name, id, type, price, stock, description }) => {
    //Destuctura un objeto para recibir los datos
    if (productos.some(prod => prod.id === id)) {
        // console.warn("Ya existe un producto con ese id") // esto lo podemos hacer a futuro con lirberias
    } else {
        const productoNuevo = new Producto(name, id, type, price, stock, description)
        productos.push(productoNuevo)
        //guarda el nuevo array de productos
        localStorage.setItem('productos', JSON.stringify(productos))
    }
}

const productosPreexistentes = () => {
    // Si el array de productos esta vacio, utiliza el array de productos pre-existente
    if (productos.length === 0) {
        productosBase.forEach(prod => {
            let dato = JSON.parse(JSON.stringify(prod))
            agregarProducto(dato)
        }
        )
    }
}

const totalCarrito = () => {
    let total = carrito.reduce((acumulador, { price, quantity }) => {
        return acumulador + (price * quantity)
    }, 0)
    return total
}
const totalCarritoRender = () => {
    // se encarga de calcular el total del carrito
    const carritoTotal = document.getElementById("carritoTotal")
    carritoTotal.innerHTML = `Precio total: $ ${totalCarrito()}`
}

const agregarCarrito = (objetoCarrito) => {
    // agrega productos al carrito
    carrito.push(objetoCarrito)
    totalCarritoRender()
}



const renderizarCarrito = () => {
    // borra el cotnenido de carrito y renderiza carrito en una lista
    const listaCarrito = document.getElementById("listaCarrito")
    // borramos para evitar clones viejos
    listaCarrito.innerHTML = ""
    carrito.forEach(({ name, price, quantity, id }) => {
        let elementoLista = document.createElement("li")
        elementoLista.innerHTML = `Producto:${name} -- P/u: ${price} -- Cant.:${quantity} <button id="eliminarCarrito${id}">X</button>`
        listaCarrito.appendChild(elementoLista)
        const botonBorrar = document.getElementById(`eliminarCarrito${id}`)
        botonBorrar.addEventListener("click", () => {
            // creo un array sin el elemento a borrar y lo igualo a carrito
            carrito = carrito.filter((elemento) => {
                if (elemento.id !== id) {
                    return elemento
                }
            })
            let carritoString = JSON.stringify(carrito)
            localStorage.setItem("carrito", carritoString)
            renderizarCarrito()
        })
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoString)
    })
}

const borrarCarrito = () => {
    carrito.length = 0  //es una manera de borrar el contenido de un array constante
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoString)
    renderizarCarrito()
}

const renderizarProductos = (arrayUtilizado) => {
    // renderiza productos en el DOM
    const contenedorProductos = document.getElementById("contenedorProductos")
    // borramos para no duplicar
    contenedorProductos.innerHTML = ""
    arrayUtilizado.forEach(({ name, id, type, price, stock, description }) => {
        const prodCard = document.createElement("div")
        prodCard.classList.add("col-xs")
        prodCard.classList.add("card")
        prodCard.style = "width: 270px;height: 550px; margin:3px"
        prodCard.id = id
        prodCard.innerHTML = `
                <img src="./assets/${name + id}.png" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6>${type}</h6>
                    <p class="card-text">${description}</p>
                    <span>Stock: ${stock}</span>
                    <span>$ ${price}</span>
                    <form id="form${id}">
                        <label for="contador${id}">Cantidad</label>
                        <input type="number" placeholder="0" id="contador${id}">
                        <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
                    </form>
                </div>`
        contenedorProductos.appendChild(prodCard)
        const btn = document.getElementById(`botonProd${id}`)
        // Funcionalidad al boton de agregar para agregar prods al carrito
        btn.addEventListener("click", (evento) => {
            evento.preventDefault()
            const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
            if (contadorQuantity > 0) {
                agregarCarrito({ name, id, type, price, stock, description, quantity: contadorQuantity })
                renderizarCarrito()
                const form = document.getElementById(`form${id}`)
                form.reset()
            }
        })
    })
}




const finalizarCompra = (event) => {
    // console.log(event)
    // como conseguir todos los datos de un form
    // conseguimos la data de la form
    const data = new FormData(event.target)
    // console.log(data)
    // creamos un objeto que sea {nombreInput: valorInput,...}
    const cliente = Object.fromEntries(data)
    // console.log(cliente)
    // Creamos un "ticket"
    const ticket = { cliente: cliente, total: totalCarrito(), id: pedidos.length, productos: carrito } //idealmente le ponen id único mejor que este
    pedidos.push(ticket)
    // Guardamos el ticket en nuestra "base de datos"
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
    // Borra el array y le da un mensaje al usuario
    borrarCarrito()
    let mensaje = document.getElementById("carritoTotal")
    mensaje.innerHTML = "Muchas gracias por su compra, los esperamos pronto"

}

// DOM
const compraFinal = document.getElementById("formCompraFinal")
compraFinal.addEventListener("submit", (event) => {
    // evitamos el reset
    event.preventDefault()
    if (carrito.length > 0) {
        finalizarCompra(event)
    } else {
        // console.warn("canasta vacia") // no para esta entrega, lo ahcemos a futuro con lirberias
    }
})
const selectorTipo = document.getElementById("tipoProducto")
selectorTipo.onchange = (evt) => {
    const tipoSeleccionado = evt.target.value
    if (tipoSeleccionado === "0") {
        renderizarProductos(productos)
    } else {
        renderizarProductos(productos.filter(prod => prod.type === tipoSeleccionado))
    }
}


// Testing
const app = () => {
    productosPreexistentes()
    renderizarProductos(productos)
    renderizarCarrito()
    totalCarritoRender()
}

//ejecuto mi aplicacion
app()