export default class City {
    constructor(name, description, pressure, temperature, humidity, icon){
        this.name = name;
        this.description = description;
        this.pressure = pressure+' hPA';
        this.temperature = Math.round(temperature)+ " °C";
        this.humidity = humidity + '%';
        this.icon = icon;
        this.id = this.id = new Date().getTime();
        
    }
}