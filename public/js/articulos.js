document.addEventListener("DOMContentLoaded", () => {
    const selectArticulo = document.getElementById("articulo");
  
    const cargarArticulos = async () => {
      try {
        // Realizar una solicitud GET a la API
        const response = await fetch("http://127.0.0.1:3000/api/articulos");
  
        // Verificar si la respuesta es válida
        if (!response.ok) {
          throw new Error(`Error al obtener los artículos: ${response.statusText}`);
        }
  
        // Convertir la respuesta en JSON
        const data = await response.json();
  
        // Iterar sobre los datos y agregar opciones al select
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id_artic; // Asignar número de artículo como valor
          option.textContent = `${item.numero_artic} - ${item.detalle}`; // Mostrar número_artic y detalle
          selectArticulo.appendChild(option);
        });
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      }
    };
  
    cargarArticulos();
  });
  