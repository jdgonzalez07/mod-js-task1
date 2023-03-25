const API_URL_EVENTS = " https://mindhub-xj03.onrender.com/api/amazing";

let events = [];

async function getEvents() {
  try {
    let response = await fetch(API_URL_EVENTS);
    let dataApi = await response.json();
    events = dataApi.events;
    let query = location.search;
    let params = new URLSearchParams(query);
    let idParams = params.get("id");
    let profile = events.find((info) => info._id == idParams);
    console.log(typeof events);

    const container = document.getElementById("container-detail");
    console.log("estoy en el container-detail", container);

    let html = "";

    html += `

<div class="card mb-3 detail-container " style="max-width: 740px; max-height: 740px">
        <div class="row g-0 detail">
          <div class="col-md-4">
            <img
              src="${profile.image}"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${profile.name}</h5>
              <p class="card-text">
              ${profile.description}
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
              <p>Place:<span> ${profile.place}</span></p>
              <p>Capacity:<span> ${profile.capacity}</span></p>
               
              <p>Price:<span> $${profile.price}</span></p>
        </div>
      </div>
`;
    container.innerHTML = html;
  } catch (error) {
    console.log(error.message);
  }
}
getEvents();
