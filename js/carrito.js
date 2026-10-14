let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

window.agregarAlCarrito = (idProducto, productosCatalogo) => {
    const productoEncontrado = productosCatalogo.find(p => p.id == idProducto);
    if (!productoEncontrado) return;

    const existe = carrito.find(p => p.id == idProducto);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
};

const actualizarContadorCarrito = () => {
    const contador = document.querySelector("#contador-carrito");
    if (contador) {
        contador.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }
};

const mostrarCarritoModal = () => {
    const contenedorModal = document.querySelector("#contenido-carrito");
    const precioTotal = document.querySelector("#precio-total");

    if (!contenedorModal) return;

    if (carrito.length === 0) {
        contenedorModal.innerHTML = `<p class="text-center text-muted my-3">Tu carrito está vacío.</p>`;
        if (precioTotal) precioTotal.innerText = "0";
        return;
    }

    contenedorModal.innerHTML = "";
    let totalAcumulado = 0;

    carrito.forEach(producto => {
        const { id, nombre, precio, cantidad, imagen } = producto;
        const subtotal = precio * cantidad;
        totalAcumulado += subtotal;

        const fila = document.createElement("div");
        fila.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3", "border-bottom", "pb-2");
        
        fila.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${imagen}" alt="${nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded me-3">
                <div>
                    <h6 class="mb-0 fw-bold">${nombre}</h6>
                    <small class="text-muted">$${precio} x ${cantidad}</small>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <span class="fw-bold text-success me-3">$${subtotal}</span>
                <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${id}">❌</button>
            </div>
        `;
        
        const btnEliminar = fila.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            eliminarDelCarrito(id);
        });

        contenedorModal.appendChild(fila);
    });

    if (precioTotal) {
        precioTotal.innerText = totalAcumulado;
    }
};

const eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(p => p.id != idProducto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarCarritoModal();
};

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "btn-vaciar") {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
        mostrarCarritoModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();

    const btnCarritoModal = document.querySelector("#btn-carrito");
    if (btnCarritoModal) {
        btnCarritoModal.addEventListener("click", mostrarCarritoModal);
    }
});

