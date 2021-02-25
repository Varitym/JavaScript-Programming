export default class Hole{
    constructor(number){
        this.color = '#000000'
        this.radius = 15
        this.diameter = this.radius * 2
        this.number = number
        this.position = {
            x: 0,
            y: 0
        }
    }
}