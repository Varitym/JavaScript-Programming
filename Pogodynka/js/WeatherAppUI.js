export default class WeatherAppUI{
    constructor(container){
        this.container = document.querySelector(container);
        this.cityInput = document.querySelector(".cityName");
        this.cityForm = document.querySelector(".city-form");

    }

    renderCities(cities){
        //console.log(cities);
        this.container.innerHTML= '';
        cities.forEach((city) =>{
            // console.log(city);
            this.renderHTML(city);
        });
    }

    renderHTML(city){
        const template = document.createElement("div");
        const htmlCityName = document.createElement("div");
        const htmlDesc = document.createElement("div");
        const htmlTemp = document.createElement("div");
        const htmlPressure = document.createElement("div");
        const htmlHumidity = document.createElement("div");

        template.classList.add("single-city");
        htmlCityName.classList.add("city-name");
        htmlDesc.classList.add("desc");
        htmlTemp.classList.add("temp");
        htmlPressure.classList.add("pressure");
        htmlHumidity.classList.add("humidity");

        htmlCityName.innerHTML = city.name;
        htmlDesc.innerHTML = city.description;
        htmlTemp.innerHTML = city.temperature;
        htmlPressure.innerHTML = city.pressure;
        htmlHumidity.innerHTML = city.humidity;

        template.appendChild(htmlCityName);
        template.appendChild(htmlDesc);
        template.appendChild(htmlTemp);
        template.appendChild(htmlPressure);
        template.appendChild(htmlHumidity);

        this.container.appendChild(template);
        

    }

    clearForm(){
        
    }
}