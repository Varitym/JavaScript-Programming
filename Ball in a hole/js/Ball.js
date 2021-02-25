export default class Ball{
    constructor(){
        this.color = '#000FFF'
        this.radius = 15
        this.diameter = this.radius * 2
        this.acceleration = 0.02
        this.position = {
            x: 0,
            y: 0
        }
    }
}