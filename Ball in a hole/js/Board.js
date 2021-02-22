export default class Board{
    constructor(){
        this.canvas = document.querySelector("#board");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.backgroundColor = '#FFFFFF';
        this.size = {
            width: this.canvas.getBoundingClientRect().width,
            height: this.canvas.getBoundingClientRect().height
        }
    }
}