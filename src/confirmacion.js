// RECUPERAR PEDIDO

const pedido = JSON.parse(localStorage.getItem("pedidoActual"));

const numeroPedido = document.getElementById("numero-pedido");
const detallePedido = document.getElementById("detalle-pedido");
const totalPedido = document.getElementById("total-pedido");
const modalidadPedido = document.getElementById("modalidad-pedido");

// MOSTRAR INFORMACIÓN

if (pedido) {

    numeroPedido.textContent = pedido.numero;

    pedido.productos.forEach(function(item) {

        detallePedido.innerHTML += `
            <div class="producto-resumen">
                <p>${item.nombre} x ${item.cantidad}</p>
                <strong>$${item.subtotal.toLocaleString("es-AR")}</strong>
            </div>
        `;

    });

    totalPedido.textContent = "$" + pedido.total.toLocaleString("es-AR");

    if (pedido.entrega === "domicilio") {
        modalidadPedido.textContent =
            "Envío a domicilio: " +
            pedido.direccion.calle + ", " +
            pedido.direccion.localidad + " (" +
            pedido.direccion.codigoPostal + ")";
    } else {
        modalidadPedido.textContent = "Retiro en Luján";
    }

} else {

    document.querySelector(".confirmacion-pedido").textContent =
        "No encontramos información del pedido.";

}