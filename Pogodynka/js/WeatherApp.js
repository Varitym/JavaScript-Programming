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
        if (citiesLS) {
             this.citiesArr = [...citiesLS];
             this.citiesArr.forEach((city) =>{
                this.getWeather(city);
            });
        }
        this.weatherUI.cityForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const cityName = this.weatherUI.cityInput.value;
            this.citiesArr.push(cityName)
            this.db.saveCities(this.citiesArr);
            this.weatherUI.cityForm.reset();
            this.getWeather(cityName);
            });
    }

    async getCity(city){
        let query = `${city}&appid=${this.apiKey}&units=metric&lang=pl`;
        let response = await fetch(this.cityURL+query);
        let data = await response.json();
        
        return data;
    };

    async getWeather(city){
        const cityDetails = await this.getCity(city);
       
        const newCity = new City(
            cityDetails.name,
            cityDetails.weather[0].description,
            cityDetails.main.pressure,
            cityDetails.main.temp,
            cityDetails.main.humidity,
            cityDetails.weather[0].icon
        );

        this.weatherUI.renderHTML(newCity);
      }
}


