export default class Db {
    constructor() {
        this.citiesLSKey = 'cities';
    }

    saveCities(cities) {
        localStorage.setItem(this.citiesLSKey, JSON.stringify(cities));
    }

    getCity() {
        const citiesFromStorage = JSON.parse(localStorage.getItem(this.citiesLSKey));
        if (citiesFromStorage) {
            return citiesFromStorage;
        }
        return;
    }
}