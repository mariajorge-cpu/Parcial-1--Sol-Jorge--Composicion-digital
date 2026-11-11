// MODALIDAD DE ENTREGA

const opcionesEntrega = document.querySelectorAll('input[name="entrega"]');
const datosDomicilio = document.getElementById("datos-domicilio");

opcionesEntrega.forEach(function(opcion) {

    opcion.addEventListener("change", function() {

        if (opcion.value === "domicilio") {
            datosDomicilio.style.display = "block";
        } else {
            datosDomicilio.style.display = "none";
        }

    });

});

// RECUPERAR PRODUCTOS DEL CARRITO

const carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];

const resumenProductos = document.getElementById("resumen-productos");
const totalCompra = document.getElementById("total-compra");

function mostrarResumen() {

    resumenProductos.innerHTML = "";

    let total = 0;

    if (carritoCompra.length === 0) {
        resumenProductos.innerHTML = "<p>No hay productos en tu carrito.</p>";
        totalCompra.textContent = "$0";
        return;
    }

    carritoCompra.forEach(function(item) {

        const producto = productos.find(function(p) {
            return p.id === item.id;
        });

        if (!producto) return;

        const subtotal = producto.precio * item.cantidad;

        total += subtotal;

        resumenProductos.innerHTML += `
            <div class="producto-resumen">
                <p>${producto.nombre} x ${item.cantidad}</p>
                <strong>$${subtotal.toLocaleString("es-AR")}</strong>
            </div>
        `;

    });

    totalCompra.textContent = "$" + total.toLocaleString("es-AR");

}

mostrarResumen();

// CONFIRMAR PEDIDO

const formulario = document.getElementById("formulario-compra");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Verificar que haya productos
    if (carritoCompra.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Obtener modalidad de entrega
    const entregaSeleccionada = document.querySelector('input[name="entrega"]:checked');

    if (!entregaSeleccionada) {
        alert("Seleccioná una modalidad de entrega.");
        return;
    }

    // Obtener datos de domicilio si corresponde
    let direccion = {};

    if (entregaSeleccionada.value === "domicilio") {

        const calle = document.getElementById("direccion").value.trim();
        const localidad = document.getElementById("localidad").value.trim();
        const codigoPostal = document.getElementById("codigo-postal").value.trim();

        if (!calle || !localidad || !codigoPostal) {
            alert("Completá todos los datos de entrega.");
            return;
        }

        direccion = {
            calle: calle,
            localidad: localidad,
            codigoPostal: codigoPostal
        };
    }

    // Obtener los productos del pedido
    const productosPedido = carritoCompra.map(function(item) {

        const producto = productos.find(function(p) {
            return p.id === item.id;
        });

        return {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: item.cantidad,
            subtotal: producto.precio * item.cantidad
        };

    }).filter(Boolean);

    const total = productosPedido.reduce(function(suma, item) {
        return suma + item.subtotal;
    }, 0);

    // Crear pedido
    const pedido = {
        numero: "LJ-" + Date.now().toString().slice(-6),
        fecha: new Date().toLocaleDateString("es-AR"),
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        entrega: entregaSeleccionada.value,
        direccion: direccion,
        productos: productosPedido,
        total: total
    };

    // Guardar pedido
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push(pedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.setItem("pedidoActual", JSON.stringify(pedido));

    // Vaciar carrito
    localStorage.removeItem("carrito");

    // Ir a confirmación
    window.location.href = "confirmacion.html";

});