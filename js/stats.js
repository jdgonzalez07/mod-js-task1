///// USANDO LA API

const API_URL_EVENTS = " https://mindhub-xj03.onrender.com/api/amazing";

let events = [];
let upcomingEvents = [];

let pastEvents = [];
let fechaActual;

async function getEvents() {
  try {
    let response = await fetch(API_URL_EVENTS);
    let dataApi = await response.json();
    events = dataApi.events;
    fechaActual = dataApi.currentDate;

    ///// Llamada de funciones
    printFirstTable(events);

    categoriesUpcoming(upcomingEvents);
    categoriesPast(pastEvents);

    ///// Filtrando eventos past y upcoming
    for (let i = 0; i < events.length; i++) {
      if (events[i].date > fechaActual) {
        upcomingEvents.push(events[i]);
      } else {
        pastEvents.push(events[i]);
      }
    }
    /* console.log(upcomingEvents);
    console.log(pastEvents);
    console.log(fechaActual); */
  } catch (error) {
    console.log(error.message);
  }
}

getEvents();

// Constantes capturadas y variables
const contenedorPast1 = document.getElementById("firstTable");
const contenedorUpcoming = document.getElementById("secondTable");
const contenedorPast2 = document.getElementById("thirdTable");

//////////  Funciones

// Primera tabla

function maximaAsistencia(arrayDatos) {
  let mayorPorcentaje = 0;
  let mayorAsistencia = "";
  arrayDatos.forEach((event) => {
    const porcentaje = (event.assistance / event.capacity) * 100;
    if (porcentaje > mayorPorcentaje) {
      mayorPorcentaje = porcentaje;
      mayorAsistencia = event.name;
    }
  });
  return `${mayorAsistencia} (${mayorPorcentaje})`;
}

function minimaAsistencia(arrayDatos) {
  let menorPorcentaje = Infinity;
  let menorAsistencia = "";
  arrayDatos.forEach((event) => {
    const porcentaje = (event.assistance / event.capacity) * 100;
    if (porcentaje < menorPorcentaje) {
      menorPorcentaje = porcentaje;
      menorAsistencia = event.name;
    }
  });

  return ` ${menorAsistencia}  ${menorPorcentaje}`;
}

function maxCapacidad(arrayDatos) {
  const eventoMayorCapacidad = arrayDatos.reduce((anterior, actual) => {
    if (actual.capacity > anterior.capacity) {
      return actual;
    } else {
      return anterior;
    }
  });
  return `${eventoMayorCapacidad.name} (${eventoMayorCapacidad.capacity})`;
}

function printFirstTable() {
  contenedorPast1.innerHTML = `
  <td colspan="1">${maximaAsistencia(events)}</td>
  <td colspan="1">${minimaAsistencia(events)}</td>
  <td colspan="1">${maxCapacidad(events)}</td>
  `;
}

// Segunda tabla (categorías)
async function categoriesUpcoming(upcomingEvents) {
  let iterador = await upcomingEvents;
  let categorias = [];
  iterador.forEach((cate) => {
    categorias.push(cate.category);
  });

  let categoriasUnicas = Array.from(new Set(categorias));

  const resultadoPrecio = iterador.map((ite) => ite.price * ite.estimate);
  /* console.log(resultadoPrecio); */
 
  for(i = 0; i < resultadoPrecio.length; i ++){
   /* console.log(resultadoPrecio[i]); */
  }

  for (let i = 0; i < categoriasUnicas.length; i++) {
    contenedorUpcoming.innerHTML += `
     <td colspan="1">${categoriasUnicas[i]}</td>
     <td colspan="1">${resultadoPrecio[i]}</td>
    `;
  }
}


// Tercera tabla (categorías)
async function categoriesPast(pastEvents) {
  let iterador = await pastEvents;
  let categorias = [];
  iterador.forEach((cate) => {
    categorias.push(cate.category);
  });

  let categoriasUnicas = Array.from(new Set(categorias));/* console.log(categoriasUnicas); */

  /* let porcentaje = iterador.map((ite) => 
    ite.assistance + ite.capacity);
    console.log(porcentaje); */


 const resultadoPrecio = iterador.map((ite) => ite.price * ite.assistance);
 /* console.log(resultadoPrecio); */

 for(i = 0; i < resultadoPrecio.length; i ++){
  /* console.log(resultadoPrecio[i]); */
 }



  for (let i = 0; i < categoriasUnicas.length; i++) {
    contenedorPast2.innerHTML += `
    <td colspan="1">${categoriasUnicas[i]}</td>
    <td colspan="1">${resultadoPrecio[i]}</td>
    `;
  }
}
