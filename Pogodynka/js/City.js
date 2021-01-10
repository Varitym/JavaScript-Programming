export default class City {
    constructor(city, description, pressure, temperature, humidity, icon){
        this.city = city;
        this.description = description;
        this.pressure = pressure+' hPA';
        this.temperature = Math.round(temperature)+ " °C";
        this.humidity = humidity + '%';
        this.icon = icon;
    }
}