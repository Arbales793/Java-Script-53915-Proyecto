async function pedirDatosalBackend() {
    try {
        const resp = await fetch("./productos.json").then(rta => {
            return rta.json()
        }).then(rta => {
            renderizarProductos(rta)
            listaProd = rta
        }
        )
    } catch (error) {
        lanzarAlerta("Algo salio mal, error: " + error)
    }
}

pedirDatosalBackend()

class Producto {
    constructor(name, id, type, price, stock, description,) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.price = price;
        this.stock = stock;
        this.description = description;
    }
}

const productos = JSON.parse(localStorage.getItem("productos")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

const agregarProducto = ({ name, id, type, price, stock, description }) => {

    if (productos.some(prod => prod.id === id)) {
    } else {
        const productoNuevo = new Producto(name, id, type, price, stock, description,)
        productos.push(productoNuevo)
        localStorage.setItem('productos', JSON.stringify(productos))
    }
}

const productosPreexistentes = () => {
    if (productos.length === 0) {
        productos.forEach(prod => {
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
    const carritoTotal = document.getElementById("carritoTotal")
    carritoTotal.innerHTML = `Precio total: $ ${totalCarrito()}`
}

const agregarCarrito = (objetoCarrito) => {
    carrito.push(objetoCarrito)
    totalCarritoRender()

    Swal.fire({
        title: 'Agregaste productos al carrito',
        text: 'Al pie de página verás tus productos',
        icon: 'info',
        confirmButtonText: 'Aceptar'
    })
}

const renderizarCarrito = () => {
    const listaCarrito = document.getElementById("listaCarrito")
    listaCarrito.innerHTML = ""
    carrito.forEach(({ name, price, quantity, id }) => {
        let elementoLista = document.createElement("li")
        elementoLista.innerHTML = `Producto:${name} -- P/u: ${price} -- Cant.:${quantity} <button id="eliminarCarrito${id}">X</button>`
        listaCarrito.appendChild(elementoLista)
        const botonBorrar = document.getElementById(`eliminarCarrito${id}`)
        botonBorrar.addEventListener("click", () => {
            carrito = carrito.filter((elemento) => {
                if (elemento.id !== id) {
                    return elemento
                }
                Swal.fire({
                    title: '¡Ups!',
                    text: '¡Acabas de quitar cosas a tu carrito!',
                    icon: 'warning',
                    confirmButtonText: 'Listo'
                })
            })
            let carritoString = JSON.stringify(carrito)
            localStorage.setItem("carrito", carritoString)
            renderizarCarrito()
        })
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoString)
    })
    const carritoTotal = document.getElementById("carritoTotal")
    carritoTotal.innerHTML = `Precio total: $ ${totalCarrito()}`
}

const borrarCarrito = () => {
    carrito.length = 0
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoString)
    renderizarCarrito()


}
borrarCarrito()


const renderizarProductos = (productosPreexistentes) => {
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""
    productosPreexistentes.forEach(({ name, id, type, price, stock, description, }) => {
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
                            <input type="number" placeholder="1" id="contador${id}">
                            <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
                        </form>
                    </div>`
        contenedorProductos.appendChild(prodCard)
        const btn = document.getElementById(`botonProd${id}`)
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
    const data = new FormData(event.target)
    const cliente = Object.fromEntries(data)
    const ticket = { cliente: cliente, total: totalCarrito(), id: pedidos.length, productos: carrito }
    pedidos.push(ticket)
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
    borrarCarrito()
    let mensaje = document.getElementById("carritoTotal")
    mensaje.innerHTML = "Muchas gracias por su compra, los esperamos pronto"

    Swal.fire({
        title: '¡Genial!',
        text: '¡Acabas de realizar tu compra!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })

}

const compraFinal = document.getElementById("formCompraFinal")
compraFinal.addEventListener("submit", (event) => {
    event.preventDefault()
    if (carrito.length > 0) {
        finalizarCompra(event)
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
app()