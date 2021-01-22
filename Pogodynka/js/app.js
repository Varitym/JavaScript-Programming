import City from "./City.js";
import Db from "/js/Db.js";
// class WeatherApp{
//     constructor(){
//         this.apiKey = 'f06a8503c0afdd7b6f867360381c0e45'
//         this.base = 'http://api.openweathermap.org/data/2.5/weather?q='

//     }
//     const getCity = async (city)=>{
//         const base = 'http://api.openweathermap.org/data/2.5/weather?q=';
//         const query = '${city}&appid=${apiKey}&units=metric&lang=pl';

//     }

// }

// //const url = 'http://api.openweathermap.org/data/2.5/weather?q=${city name}&appid=${apiKey}'
// addEventListener('click', )
const cityForm = document.querySelector("form");
const apiKey = "f06a8503c0afdd7b6f867360381c0e45";
let db = new Db();
let citiesArr = [];

function init(){
    const citiesLS = db.getCity();
    console.log(citiesLS);
    if (citiesLS) {
        citiesArr = [...citiesLS];
        let ins = citiesArr;
        citiesArr.foreach = insertTemplate(ins);
    }
}
const getCity = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather?q=";
  const query = `${city}&appid=${apiKey}&units=metric&lang=pl`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

const insertTemplate = async (city) => {
  const cityDetails = await getCity(city);
  console.log(cityDetails.main.temp);
  
  const newCity = new City(
    cityDetails.name,
    cityDetails.weather[0].description,
    cityDetails.main.pressure,
    cityDetails.main.temp,
    cityDetails.main.humidity,
    cityDetails.weather[0].icon
  );
  console.log(newCity);

  const template = `<div class = "single-city">
                    <div class = "city-name">${newCity.city}</div>
                    <div class = "desc">${newCity.description}</div>
                    <div class = "temp">${newCity.temperature} </div>
                    <div class = "pressure">Ciśnienie: ${newCity.pressure}</div>
                    <div class = "humidity">Wilgotność: ${newCity.humidity}</div>
                    </div>`;
  const kontener = document.querySelector(".miasto");
  kontener.innerHTML += template;
  console.log(kontener);
  
};
window.onload = init();

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const cityName = document.querySelector(".cityName").value;
  citiesArr.push(cityName)
  db.saveCities(citiesArr);
  cityForm.reset();
  insertTemplate(cityName);
});
//