export default class Board{
    constructor(){
        this.canvas = document.querySelector('#canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.style.backgroundColor = '#FFFFFF'
        this.size = {
            width: this.canvas.getBoundingClientRect().width,
            height: this.canvas.getBoundingClientRect().height
        }
    }
}