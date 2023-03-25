
///// USANDO LA API

const API_URL_EVENTS = " https://mindhub-xj03.onrender.com/api/amazing";

let events = [];

async function getEvents() {
  try {
    let response = await fetch(API_URL_EVENTS);
    let dataApi = await response.json();
    events = dataApi.events;
    pintarTarjetas(events);
    crearChecks(events);
    console.log(typeof(events));
  } catch (error) {
    console.log(error.message);
  }
}

getEvents();

// Constantes capturadas y variables
const contenedor = document.getElementById("items-cards-home");
const contenedorChecks = document.getElementById("checkbox-items");
const input = document.querySelector("input");

// Eventos
input.addEventListener("input", superFiltro);

contenedorChecks.addEventListener("change", superFiltro);

// Llamadas de funciones



// Funciones
function superFiltro() {
  let arrayFiltrado1 = filtrarPorTexto(events, input.value);
  let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado1);
  pintarTarjetas(arrayFiltrado2);
}

function pintarTarjetas(arrayDatos) {
  if (arrayDatos.length === 0) {
    contenedor.innerHTML =
      "<div class ='tarjetaErrorHome'><h3>¡No hay coincidencias!</h3></div>";

    return;
  }

  let tarjetas = "";

  arrayDatos.forEach((element) => {
    tarjetas += `
    <div class="card" style="width: 18rem">
  <img src=" ${element.image} "/>
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text">
      ${element.description}
    </p>
    <span class="price">Price:$${element.price}</span>
    <a href="./detail.html?id=${element._id}" class="btn-card"> Go somewhere</a>
  </div>
</div>
    `;
  });

  contenedor.innerHTML = tarjetas;
}

function crearChecks(arrayDatos) {
  let checks = "";
  let categoriasRepetidas = arrayDatos.map((element) => element.category);

  let categorias = new Set(
    categoriasRepetidas.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    })
  );
  categorias.forEach((element) => {
    checks += `<div class="form-check">
    <input class="form-check-input" type="checkbox" id="${element}" value="${element}">
    <label class="form-check-label" for="${element}">${element}</label>
  </div>`;
  });

  contenedorChecks.innerHTML = checks;
}

function filtrarPorTexto(arrayDatos, texto) {
  let arrayFiltrado = arrayDatos.filter((element) =>
    element.name.toLowerCase().includes(texto.toLowerCase())
  );
  return arrayFiltrado;
}

function filtrarPorCategoria(arrayDatos) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  console.log(checkboxes);
  let arrayChecks = Array.from(checkboxes);
  console.log(arrayChecks);
  let checksChecked = arrayChecks.filter((check) => check.checked);
  console.log(checksChecked);
  if (checksChecked.length == 0) {
    return arrayDatos;
  }
  let checkValues = checksChecked.map((check) => check.value);
  console.log(checkValues);
  let arrayFiltrado = arrayDatos.filter((element) =>
    checkValues.includes(element.category)
  );
  console.log(arrayFiltrado);
  return arrayFiltrado;
}
