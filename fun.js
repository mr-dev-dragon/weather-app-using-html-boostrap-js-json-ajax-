const cityName = document.getElementById("cityName"); 
const country = document.getElementById("country");
const timeZone = document.getElementById("timeZone");
const coords = document.querySelector(".coord").querySelectorAll("p");
const weatherType = document.getElementById("weatherType");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.querySelector(".temp").querySelectorAll("p");
const visibility = document.getElementById("visibility");
const wind = document.querySelector(".wind").querySelectorAll("p");
const clouds = document.getElementById("clouds");
const weatherImg = document.getElementById("weatherImg");
const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
function getData(location) {
    let loc = location;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            cityName.textContent = `Location : ${data.name}`;
            country.textContent = `Country : ${data.sys.country}`;
            timeZone.textContent = `Timezone : ${data.timezone}`;
            coords[0].textContent = `Longitude : ${data.coord.lon}`;
            coords[1].textContent = `Latitude : ${data.coord.lat}`;
            weatherType.textContent = `Weather type : ${data.weather[0].main}`;
            weatherDesc.textContent = `Weather description : ${data.weather[0].description}`;
            weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            temp[0].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
            temp[1].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
            temp[2].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            temp[3].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
            temp[4].textContent = `Pressure : ${data.main.pressure}`;
            temp[5].textContent = `Humidity : ${data.main.humidity}`;
            visibility.textContent = `Visibility : ${data.visibility}`;
            wind[0].textContent = `Wind speed : ${data.wind.speed}`;
            wind[1].textContent = `Wind deg : ${data.wind.deg}`;
        } else {alert('Some error occured');}}
        xhr.send();}
function ktc(k) {
    k = (k - 273.15);
    return k.toFixed(2);}
const searchBtn = document.querySelector(".searchBox").querySelector("button");
const searchBox = document.querySelector(".searchBox").querySelector("input");
searchBox.addEventListener("keypress", (e) => {
    if (e.which === 13) {
        let searchVal = searchBox.value;
        if (searchVal === "") {
            alert("Enter location name in the search box")
        } else if (searchVal !== "") {
            searchVal = searchVal.split("");
            searchVal[0] = searchVal[0].toUpperCase();
            searchVal = searchVal.join("");
            getData(searchVal);}}})
searchBtn.addEventListener("click", () => {
    let searchVal = searchBox.value;
    if (searchVal === "") {
        alert("Enter location name in the search box")
    } else if (searchVal !== "") {
        searchVal = searchVal.split("");
        searchVal[0] = searchVal[0].toUpperCase();
        searchVal = searchVal.join("");
        getData(searchVal);
    }
})
async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
    getProjict(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No profile with this username");
    }
  }
}
async function getProjict(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");
    addProjictToCard(data);
  } catch (err) {
    createErrorCard("Problem fetching Projict");
  }
}
function createUserCard(user) {
    const cardHTML = `
                    <style>
                        .mmmm{margin-left: 35px;
                               margin-top: 50px;
                        }
                        .nnnn{
                            display.none
                        }
                        .btnnn{
                            position: absolute;
                            bottom:45px ;
                            right:65px ;
                            font-with:900;
                        }
                    </style>
    <div class=" mmmm card" style="width: 18rem;">
    <div>
      <img class="card-img-top" src="${user.avatar_url}" alt="${user.name}" >
    </div>
     <div class="card-body">
      <h2 class="card-title">${user.name}</h2>
      <p>${user.bio}</p>
      <ul>
        <li class="card-text">${user.followers} <strong>Followers</strong></li>
        <li class="card-text">${user.following} <strong>Following</strong></li>
        <li class="card-text">${user.public_repos} <strong>Projict</strong></li>
      </ul>
      <div class="btn nnnn btn-primary" id="Projict">
      <p class=" btnnn">Go To Github profile</p>
      </div>
    </div>
  </div>
    `;
  main.innerHTML = cardHTML;
}
function createErrorCard(msg) {
  const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;

  main.innerHTML = cardHTML;
}
function addProjictToCard(Projict) {
    const ProjictEl = document.getElementById("Projict");
    Projict.slice(0, 5).forEach((INproject) => {
    const projectLINK = document.createElement("a");
    projectLINK.classList.add("INproject");
    projectLINK.href = INproject.html_url;
    projectLINK.target = "_blank";
    projectLINK.innerText = INproject.name;
    ProjictEl.appendChild(projectLINK);
  });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});

