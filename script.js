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

// Productos de la tienda
const productos = [
    { id: 1, nombre: "media", precio: 1000 },
    { id: 2, nombre: "gorra", precio: 750 },
    { id: 3, nombre: "zapato", precio: 1200 },
    { id: 4, nombre: "camisa", precio: 375 },
];

//forEach recorre el arreglo con los objetos
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