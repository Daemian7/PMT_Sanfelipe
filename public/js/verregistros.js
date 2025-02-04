document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#registros tbody");
    const btnActivas = document.getElementById("activo");
    const btnInactivas = document.getElementById("inactivo");
    const btnTodas = document.getElementById("todas"); // Botón para ver todas las multas
    let boletas = []; // Almacena los datos originales

    // Función para renderizar la tabla con un filtro opcional
    function renderizarTabla(filtroEstado = null) {
        tbody.innerHTML = ""; // Limpiar la tabla antes de agregar filas

        boletas
            .filter(boleta => filtroEstado === null || boleta.estado === filtroEstado) // Filtrar si es necesario
            .forEach(boleta => {
                const row = document.createElement("tr");

                // Convertir estado a número
                const estadoNumerico = boleta.estado === "Activo" ? 1 : 2;

                // Aplicar color según estado
                row.style.backgroundColor = estadoNumerico === 1 ? "#91ff8c" : "#ff8181";

                row.innerHTML = `
                    <td>${boleta.no_boleta}</td>
                    <td>${boleta.placa_inicial}</td>
                    <td>${boleta.placa_cod.toUpperCase()}</td>
                    <td>${boleta.tipo_vehiculo}</td>
                    <td>${boleta.nit_prop}</td>
                    <td>${boleta.tarjeta_circ}</td>
                    <td>${boleta.marca}</td>
                    <td>${boleta.color}</td>
                    <td>${boleta.tipo_licen}</td>
                    <td>${boleta.no_licencia}</td>
                    <td>${boleta.no_doc_licencia}</td>
                    <td>${boleta.dpi}</td>
                    <td>${boleta.ubicacion}</td>
                    <td>${boleta.nombre}</td>
                    <td class="estado">${boleta.estado}</td>
                    <td>
                        <button class="btn btn-primary btn-sm editar-btn" 
                            data-id="${boleta.id_boleta}" 
                            data-estado="${estadoNumerico}">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </td>
                `;

                tbody.appendChild(row);
            });
    }

    // Obtener datos y guardar en `boletas`
    fetch("http://127.0.0.1:3000/api/final")
        .then(response => response.json())
        .then(data => {
            boletas = data; // Guardar los datos originales
            renderizarTabla(); // Renderizar sin filtro
        })
        .catch(error => console.error("Error al obtener boletas:", error));

    // EVENT DELEGATION: Escuchar eventos en tbody
    tbody.addEventListener("click", function (event) {
        if (event.target.closest(".editar-btn")) {
            const button = event.target.closest(".editar-btn");
            const idBoleta = button.getAttribute("data-id");
            const estadoActual = parseInt(button.getAttribute("data-estado"), 10);
    
            // Toggle entre 1 (Activo) y 2 (Inactivo)
            const nuevoEstado = estadoActual === 1 ? 2 : 1;
    
            console.log("Nuevo estado:", nuevoEstado);  // Verifica que el estado es correcto
    
            fetch(`http://127.0.0.1:3000/api/final/${idBoleta}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: nuevoEstado }), // Asegúrate de enviar el estado en el cuerpo de la solicitud
            })
            .then(response => response.json())
            .then(data => {
                console.log("Estado actualizado con éxito");
    
                // Actualizar el estado en el array de boletas
                const boleta = boletas.find(b => b.id_boleta == idBoleta);
                if (boleta) {
                    boleta.estado = nuevoEstado === 1 ? "Activo" : "Inactivo";
                }
    
                // Renderizar nuevamente con el filtro actual
                renderizarTabla();
            })
            .catch(error => console.error("Error al actualizar estado:", error));
        }
    });
    

    // Filtrar por multas activas
    btnActivas.addEventListener("click", () => {
        renderizarTabla("Activo"); // Muestra solo los activos
    });

    // Filtrar por multas inactivas
    btnInactivas.addEventListener("click", () => {
        renderizarTabla("Inactivo"); // Muestra solo los inactivos
    });

    // Mostrar todas las multas
    btnTodas.addEventListener("click", () => {
        renderizarTabla(); // Llama a la función sin filtro para mostrar todas
    });
});
