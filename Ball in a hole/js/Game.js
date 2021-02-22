import Board from "/js/Board.js"
import Ball from "/js/Ball.js"
import Hole from "/js/Hole.js"

export default class Game{
    constructor(){
        this.elementStartingAngle = 0;
        this.elementEndindAngle = 2*Math.PI;
        this.holes = [];
        this.movementX = 0;
        this.movementY = 0;
        this.board = new Board();
        this.animation = ()=>this.animateBall();
        this.createBall();
        this.animateBall();
        window.addEventListener('deviceorientation',(el)=>this.ballAcceleration(el));
    }

    createBall(){
        this.ball = new Ball();
        this.drawBall(this.ball);
    }

    drawBall(element){
        //obczaj
        this.board.ctx.globalCompositeOperation = 'destination-over';
        this.hidePrevBall();
        this.board.ctx.fillStyle = element.color;
        this.board.ctx.beginPath();
        this.board.ctx.arc(element.position.x, element.position.y, element.radius, this.elementStartingAngle, this.elementEndindAngle);
        this.board.ctx.fill();
        this.board.ctx.closePath();

    }

    animateBall(){
        this.drawBall(this.ball);
        window.requestAnimationFrame(this.animation);
        this.ballMovement();
    }

    ballMovement(){     
        let tempX = this.ball.position.x + this.movementX;
        let tempY = this.ball.position.y + this.movementY;

        this.ball.position.x = Math.min(tempX, this.board.size.width - this.ball.radius)
        this.ball.position.x = Math.max(this.ball.position.x, this.board.canvas.clientLeft + this.ball.radius)
        this.ball.position.y = Math.min(tempY, this.board.size.height - this.ball.radius)
        this.ball.position.y = Math.max(this.ball.position.y, this.board.canvas.clientTop + this.ball.radius)
    }

    ballAcceleration(element) {
        this.movementX = element.alpha * this.ball.acceleration
        this.movementY = element.beta * this.ball.acceleration

        this.ballMovement()
    }
    hidePrevBall(){
        const x = 0;
        const y = 0;
        this.board.ctx.clearRect(x,y, this.board.size.width, this.board.size.height);
    }
}