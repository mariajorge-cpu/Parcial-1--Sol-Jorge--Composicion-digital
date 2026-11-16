// RECUPERAR PEDIDOS
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

const listaPedidos = document.getElementById("lista-pedidos");

// CALCULAR ESTADO DEL PEDIDO
function obtenerEstado(fecha, entrega) {

    if (!fecha) return "Registrado";

    const minutosTranscurridos = (Date.now() - Number(fecha)) / 60000;

    if (minutosTranscurridos < 1) {
        return "Registrado";
    }

    if (minutosTranscurridos < 3) {
        return "En preparación";
    }

    if (minutosTranscurridos < 5) {
        return entrega === "domicilio" ? "En camino" : "Listo para retirar";
    }

    return entrega === "domicilio" ? "Entregado" : "Retirado";
}

// ACTUALIZAR ESTADOS EN PANTALLA
function actualizarEstados() {

    const estados = document.querySelectorAll(".pedido-estado");

    estados.forEach(function(estado) {

        const fecha = estado.dataset.fecha;
        const entrega = estado.dataset.entrega;

        estado.textContent = obtenerEstado(fecha, entrega);

    });
}

// MOSTRAR PEDIDOS
function mostrarPedidos() {

    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
        listaPedidos.innerHTML = `
            <div class="sin-pedidos">
                <h2>Todavía no tenés pedidos</h2>
                <p>Cuando realices una compra, vas a poder consultar tus pedidos acá.</p>
                <a href="tienda.html" class="btn-volver">Ir a la tienda</a>
            </div>
        `;
        return;
    }

    pedidos.slice().reverse().forEach(function(pedido) {

        let productosHTML = "";

        pedido.productos.forEach(function(producto) {
            productosHTML += `
                <div class="pedido-producto">
                    <p>${producto.nombre} x ${producto.cantidad}</p>
                    <strong>$${producto.subtotal.toLocaleString("es-AR")}</strong>
                </div>
            `;
        });

        let entregaHTML = "";

        if (pedido.entrega === "domicilio") {
            entregaHTML = `
                <p><strong>Entrega:</strong> Envío a domicilio</p>
                <p><strong>Dirección:</strong> ${pedido.direccion.calle}, ${pedido.direccion.localidad} (${pedido.direccion.codigoPostal})</p>
            `;
        } else {
            entregaHTML = `
                <p><strong>Entrega:</strong> Retiro en Luján</p>
            `;
        }

        listaPedidos.innerHTML += `
            <article class="pedido-card">

                <div class="pedido-encabezado">
                    <div>
                        <h2>Pedido ${pedido.numero}</h2>
                        <p>Fecha: ${pedido.fecha}</p>
                    </div>

                    <span class="pedido-estado"
                        data-fecha="${pedido.fechaHora || ""}"
                        data-entrega="${pedido.entrega}">
                        Registrado
                    </span>
                </div>

                <div class="pedido-productos">
                    ${productosHTML}
                </div>

                <div class="pedido-informacion">
                    ${entregaHTML}
                </div>

                <div class="pedido-total">
                    <span>Total</span>
                    <strong>$${pedido.total.toLocaleString("es-AR")}</strong>
                </div>

            </article>
        `;
    });

    actualizarEstados();
}

mostrarPedidos();

// ACTUALIZAR CADA SEGUNDO
setInterval(actualizarEstados, 1000);