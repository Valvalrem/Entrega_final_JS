const URL_VERDURAS = "assets/json/verduras.json";

const contenedorProductos = document.querySelector("#contenedor-productos");

let listaVerduras = ["Tomate", "Lechuga", "Cebolla", "Remolacha", "Hinojo", "Frutilla", "Arándano", "Fruta "];

const obtenerVerduras = async () => {
    try {
        const respuesta = await fetch(URL_VERDURAS);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        listaVerduras = await respuesta.json();
        renderizarProductos(listaVerduras);

    } catch (error) {
        console.error("Ocurrió un error, por favor, intente de nuevo:", error);
        
        contenedorProductos.innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>⚠️ No pudimos cargar el catálogo en este momento. Inténtá más tarde.</p>
            </div>
        `;
    } finally {
        console.log("Proceso de carga de datos finalizado.");
    }
};

const renderizarProductos = (verduras) => {
    contenedorProductos.innerHTML = "";

    verduras.forEach(verdura => {
        const { id, nombre, precio, categoria, stock, imagen } = verdura;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-md-4", "mb-4");

        tarjeta.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${imagen}" class="card-img-top" alt="${nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <span class="badge bg-secondary mb-2">${categoria}</span>
                        <h5 class="card-title fw-bold">${nombre}</h5>
                        <p class="card-text text-success fs-5 fw-bold">$${precio}</p>
                        <p class="text-muted small">Stock disponible: ${stock}</p>
                    </div>
                    <button class="btn btn-outline-success mt-3 boton-agregar" data-id="${id}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;

        const boton = tarjeta.querySelector(".boton-agregar");
        boton.addEventListener("click", () => {
            agregarAlCarrito(id, listaVerduras);
        });

        contenedorProductos.appendChild(tarjeta);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    obtenerVerduras();
});



