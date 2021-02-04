import City from "./City.js";
import Db from "/js/Db.js";
import WeatherAppUI from "/js/WeatherAppUI.js";

export default class WeatherApp{
    constructor(){
        this.apiKey = 'f06a8503c0afdd7b6f867360381c0e45';
        this.cityURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
        this.db = new Db;
        this.citiesArr = [];
        this.weatherUI = new WeatherAppUI('.miasto');
    }

    init(){
        const citiesLS = this.db.getCity();
        const searchIcon = document.querySelector(".search-icon");
        if (citiesLS) {
             this.citiesArr = [...citiesLS];
             this.citiesArr.forEach((city) =>{
                this.getWeather(city);
            });
        }
        this.searchCity(this.weatherUI.cityForm, 'submit');
        this.searchCity(searchIcon, 'click');
        
        setInterval(() => {
            if (this.citiesArr.length === 0) return;

            this.weatherUI.container.innerHTML = '';
            this.citiesArr.forEach((city) => this.getWeather(city));
        }, 120000);
     
    }
    
    searchCity(element, type){
        console.log(element);
        element.addEventListener(type, e=>{
            e.preventDefault(); 
            const cityName = this.weatherUI.cityInput.value;
            this.citiesArr.push(cityName)
            this.db.saveCities(this.citiesArr);
            this.weatherUI.cityForm.reset();
            this.getWeather(cityName);
        });
    }

    attachEventListeners(){
        const del = document.querySelectorAll('[data-del]');
        del.forEach((el)=>{
            el.addEventListener('click', (ev)=>{
                const id = ev.target.dataset.id;
                this.removeCity(id);
            });
        });
    }

    removeCity(id){
        this.citiesArr = this.citiesArr.filter(item=>{
            item.name!=id
        });
        const deletedCity = document.getElementById(id);
        deletedCity.parentElement.removeChild(deletedCity);
        this.db.saveCities(this.citiesArr);
    }

    async getCity(city){
        let query = `${city}&appid=${this.apiKey}&units=metric&lang=pl`;
        let response = await fetch(this.cityURL+query);
        let data = await response.json();
        
        return data;
    };

    async getWeather(city){
        const cityDetails = await this.getCity(city);
        console.log(cityDetails)
        console.log(cityDetails.weather[0].icon);
        const newCity = new City(
            cityDetails.name,
            cityDetails.weather[0].description,
            cityDetails.main.pressure,
            cityDetails.main.temp,
            cityDetails.main.humidity,
            cityDetails.weather[0].icon
        );

        this.weatherUI.renderHTML(newCity);
        this.attachEventListeners();
      }
}


