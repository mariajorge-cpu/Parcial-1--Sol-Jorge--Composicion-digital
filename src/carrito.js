// RECUPERAR PRODUCTOS DEL CARRITO

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// MOSTRAR PRODUCTOS

function mostrarCarrito() {

    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    listaCarrito.innerHTML = "";

    let total = 0;

    // RECORRER LOS PRODUCTOS GUARDADOS

    carrito.forEach(function(item) {

        const producto = productos.find(function(p) {
            return p.id === item.id;
        });

        if (!producto) return;

        const subtotal = producto.precio * item.cantidad;

        total += subtotal;

        listaCarrito.innerHTML += `
            <article class="item-carrito">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div class="item-info">
                    <h2>${producto.nombre}</h2>
                    <p>Precio unitario: $${producto.precio.toLocaleString("es-AR")}</p>

                    <div class="cantidad-carrito">
                        <button onclick="cambiarCantidad('${producto.id}', -1)">−</button>

                        <span>${item.cantidad}</span>

                        <button onclick="cambiarCantidad('${producto.id}', 1)">+</button>
                    </div>
                </div>

                <div class="item-acciones">
                    <strong>$${subtotal.toLocaleString("es-AR")}</strong>

                   <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')" aria-label="Eliminar ${producto.nombre}">
    <img src="../src/iconos/eliminar.png" alt="">
</button>
                </div>

            </article>
        `;

    });

    totalCarrito.textContent = "$" + total.toLocaleString("es-AR");

}

// CAMBIAR CANTIDAD

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(function(item) {
        return item.id === id;
    });

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    guardarCarrito();

}

// ELIMINAR PRODUCTO

function eliminarProducto(id) {

    carrito = carrito.filter(function(item) {
        return item.id !== id;
    });

    guardarCarrito();

}

// GUARDAR CAMBIOS

function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();

}

// INICIAR

mostrarCarrito();

// IR A FINALIZAR COMPRA

const botonFinalizar = document.getElementById("finalizar-compra");

botonFinalizar.addEventListener("click", function() {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    window.location.href = "finalizar-compra.html";

});