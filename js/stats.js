///// USANDO LA API

const API_URL_EVENTS = " https://mindhub-xj03.onrender.com/api/amazing";

let events = [];
let upcomingEvents = [];


let fechaActual;
let pastEvents = [];
async function getEvents() {
  try {
    let response = await fetch(API_URL_EVENTS);
    let dataApi = await response.json();
    events = dataApi.events;
    fechaActual = dataApi.currentDate;
    
    console.log(pastEvents);
    ///// Llamada de funciones
    printFirstTable(events);
    /* categoriesUpcoming(upcomingEvents); */
    secondTable(categoriesPast(pastEvents));
    thirdTable(categoriesUpcoming(upcomingEvents))

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
console.log(pastEvents);
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

  let nuevasCategorias = categoriasUnicas.map(element => iterador.filter(ite => ite.category == element))

  console.log(nuevasCategorias);

  let newRevenues = nuevasCategorias.map(element => {
    let resultados = element.reduce((acumulador, eventos) =>{
      /* console.log(eventos); */
      console.log(acumulador);
      acumulador.category = eventos.category
      acumulador.revenues += eventos.price * (eventos.assistance || eventos.estimate) 
      acumulador.porcentaje += ((eventos.assistance || eventos.estimate) * 100) / eventos.capacity
      return acumulador;
    }, {revenues:0,porcentaje:0,category:""})

    resultados.porcentaje = resultados.porcentaje / element.length
    console.log(resultados);
    return resultados;

  })
return newRevenues;
}


// Tercera tabla (categorías)
async function categoriesPast(pastEvents) {
  let iterador = await pastEvents;
  console.log(iterador);
  let categorias = [];
  iterador.forEach((cate) => {
    categorias.push(cate.category);
  });

/*   console.log(categorias); */
  let categoriasUnicas = Array.from(new Set(categorias))

  let nuevasCategorias = categoriasUnicas.map(element => iterador.filter(ite => ite.category == element))

  console.log(nuevasCategorias);


  let newRevenues = nuevasCategorias.map(element => {
    let resultados = element.reduce((acumulador, eventos) =>{
      /* console.log(eventos); */
      console.log(acumulador);
      acumulador.category = eventos.category
      acumulador.revenues += eventos.price * (eventos.assistance || eventos.estimate) 
      acumulador.porcentaje += ((eventos.assistance || eventos.estimate) * 100) / eventos.capacity
      return acumulador;
    }, {revenues:0,porcentaje:0,category:""})

    resultados.porcentaje = resultados.porcentaje / element.length
    console.log(resultados);
    return resultados;

  })
return newRevenues;

 
}

async function secondTable(pastEvents) {
  console.log(pastEvents);
  let iterador = await pastEvents;
  let html = iterador.map(eventos => {
    console.log(eventos.porcentaje)
    
    return  `
    <tr>
    <td colspan="1">${eventos.category}</td>
    <td colspan="1">$${eventos.revenues}</td>
    <td colspan="1">${eventos.porcentaje.toFixed(2)}%</td>
    
    </tr>
    `
  })

  contenedorPast2.innerHTML = html.join("");
 
}

async function thirdTable(upcomingEvents) {
  console.log(pastEvents);
  let iterador = await upcomingEvents;
  let html = iterador.map(eventos => {
    console.log(eventos.porcentaje)
    
    return  `
    <tr>
    <td colspan="1">${eventos.category}</td>
    <td colspan="1">$${eventos.revenues}</td>
    <td colspan="1">${eventos.porcentaje.toFixed(2)}%</td>
    
    </tr>
    `
  })

  contenedorUpcoming.innerHTML = html.join("");
 
}