// Obtener el ID del producto desde la URL

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");

// Buscar el producto dentro del array

const productoSeleccionado = productos.find(function(producto) {
    return producto.id === idProducto;
});

// Mostrar los datos del producto

if (productoSeleccionado) {

    document.getElementById("producto-imagen").src = productoSeleccionado.imagen;
    document.getElementById("producto-imagen").alt = productoSeleccionado.nombre;

    document.getElementById("producto-categoria").textContent = productoSeleccionado.categoria;

    document.getElementById("producto-nombre").textContent = productoSeleccionado.nombre;

    document.getElementById("producto-precio").textContent =
        "$" + productoSeleccionado.precio.toLocaleString("es-AR");

    document.getElementById("producto-descripcion").textContent = productoSeleccionado.descripcion;

    document.title = productoSeleccionado.nombre + " | Luján te recibe";

} else {

    document.querySelector(".detalle-producto").textContent =
        "No encontramos el producto. Volvé a la tienda para seguir explorando.";

}

// AGREGAR PRODUCTO AL CARRITO

const botonCarrito = document.querySelector(".btn-carrito");

botonCarrito.addEventListener("click", function() {

    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (cantidad < 1 || isNaN(cantidad)) {
        alert("Ingresá una cantidad válida.");
        return;
    }

    // Recuperar carrito guardado

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si el producto ya está en el carrito

    const productoExistente = carrito.find(function(item) {
        return item.id === productoSeleccionado.id;
    });

    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        carrito.push({
            id: productoSeleccionado.id,
            cantidad: cantidad
        });

    }

    // Guardar carrito actualizado

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("¡Producto agregado al carrito!");

});