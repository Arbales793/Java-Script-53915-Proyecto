let opcion

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
}