//export default class Forecast {
    /*constructor(city, description, pressure, temperature, icon){
        this.city = city;
        this.description = description;
        this.pressure = pressure;
        this.temperature = temperature;
        this.humidity = humidity;
        this.icon = icon;
    }
}*/
    // const apiKey = 'f06a8503c0afdd7b6f867360381c0e45';


    const getCity = async (city)=>{
        const base = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const query = `${city}&appid=${apiKey}&units=metric&lang=pl`;

        const response = await fetch(base+query);
        const data = await response.json();
        return data;
        }

        

      
        
