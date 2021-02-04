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
        const htmlTemp = document.createElement("div");
        const htmlPressure = document.createElement("div");
        const htmlHumidity = document.createElement("div");
        const htmlDel = document.createElement("img");
        const pressureIcon = document.createElement("img");
        const humidityIcon = document.createElement("img");
        const htmlIcon = document.createElement("img");

        template.classList.add("single-city");
        template.setAttribute('id', city.name);
        htmlCityName.classList.add("city-name");

        htmlTemp.classList.add("temp");
        htmlPressure.classList.add("pressure");
        htmlHumidity.classList.add("humidity");
        htmlDel.classList.add("del")
        htmlDel.setAttribute('data-del','');
        htmlDel.setAttribute('data-id', city.name);
        humidityIcon.classList.add('humidity-icon');
        pressureIcon.classList.add('pressure-icon');
        htmlIcon.classList.add('icon');
        htmlDel.src = 'img/cancel.svg';
        
        humidityIcon.src = 'img/humidity.svg';
        pressureIcon.src = 'img/thermometer.svg';
        let icon = city.icon;
        if(icon=="01d" || icon=="01n"){
            htmlIcon.src = 'img/sun.svg';
        }
        else if(icon=="02d" || icon=="02n"){
            htmlIcon.src = 'img/cloudy.svg';
        }
        else if(icon=="03d" || icon=="03n" || icon=="04d" || icon == "04n"){
            htmlIcon.src = 'img/cloud.svg';
        }
        else if(icon=="09d" || icon=="09n" || icon=="10d" || icon=="10n"){
            htmlIcon.src = 'img/rainy.svg';
        }
        else if(icon=="11d" || icon=="11n"){
            htmlIcon.src = 'img/thunder.svg';
        }
        else if(icon=="13d" || icon=="13n"){
            htmlIcon.src = 'img/ice-crystal.svg';
        }
        else if(icon=="50d" || icon=="50n"){
            htmlIcon.src = 'img/mist.svg';
        }

        htmlCityName.innerHTML = city.name;
        htmlTemp.innerHTML = city.temperature;
        htmlPressure.innerHTML = city.pressure;
        htmlHumidity.innerHTML = city.humidity;
        

        template.appendChild(htmlCityName);
        template.appendChild(htmlIcon);
        template.appendChild(htmlTemp);
        template.appendChild(htmlPressure);
        template.appendChild(htmlHumidity);
        template.appendChild(htmlDel);
        template.appendChild(pressureIcon);
        template.appendChild(humidityIcon);
        

        this.container.appendChild(template);
        

    }

    clearForm(){
        
    }
}