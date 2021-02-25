import Board from "/js/Board.js"
import Hole from "/js/Hole.js"
import Ball from "/js/Ball.js"

export default class Game {
    constructor() {
        this.holes = []
        this.board = new Board()
        this.movementY = 0
        this.movementX = 0
        this.elementStartingAngle = 0
        this.elementEndingAngle = 2 * Math.PI

        this.numberOfHoles = this.generateNumberOfHoles()

        this.magicButton = document.querySelector('#magicButton')
        this.timer = document.querySelector('#timer')

        this.createBall()
        this.createHoles()
        this.animation = () => this.ballAnimation()

        this.magicButton.addEventListener('click', () => {
            this.startGame()
            this.ballAnimation()
        })

        window.addEventListener('deviceorientation', (element) => this.ballAcceleration(element))
    }

    generatePosition(element) {
        let minXPosition = this.board.canvas.clientLeft
        let maxXPosition = this.board.size.width - element.diameter

        let minYPosition = this.board.canvas.clientTop
        let maxYPosition = this.board.size.height - element.diameter

        element.position.x = (Math.floor(Math.random() * maxXPosition) + minXPosition) + element.radius
        element.position.y = (Math.floor(Math.random() * maxYPosition) + minYPosition) + element.radius
    }

    createBall() {
        this.ball = new Ball()
        this.generatePosition(this.ball)
    }

    hideBall() {
        const x = 0
        const y = 0

        this.board.context.clearRect(x, y, this.board.size.width, this.board.size.height)
    }

    drawBall(element) {
        this.board.context.globalCompositeOperation = 'destination-over'
        this.hideBall()
        this.board.context.fillStyle = element.color
        this.board.context.beginPath()
        this.board.context.arc(element.position.x, element.position.y, element.radius, this.elementStartingAngle, this.elementEndingAngle)
        this.board.context.fill()
        this.board.context.closePath()
    }
    
    createHoles() {
        for (let i = 0; i < this.numberOfHoles; i++) {
            let tempHole = new Hole(i)
            this.generatePosition(tempHole)
            this.holes.push(tempHole)
        }
    }

    drawHole(element) {
        this.board.context.fillStyle = element.color
        this.board.context.beginPath()
        this.board.context.moveTo(element.position.x, element.position.y)
        this.board.context.arc(element.position.x, element.position.y, element.radius, this.elementStartingAngle, this.elementEndingAngle)
        this.board.context.fill()
        this.board.context.closePath()
    }

    removeHole(element) {
        this.board.context.clearRect(element.position.x, element.position.y, this.board.size.width, this.board.size.height)
    }

    countTime() {
        const milisecondsDivider = 1000
        const interval = 100

        this.counter = setInterval(() => {
            let currentTime = new Date().getTime()
            let resultInSeconds = (currentTime - this.startTime) / milisecondsDivider
            timer.innerHTML = resultInSeconds.toFixed(1) + ' s'
        }, interval)
    }

    startGame() {
        this.startTime = new Date().getTime()
        this.countTime()
        this.magicButton.className = 'running'
    }

    stopTime() {
        clearInterval(this.counter)
    }

    changeTimerColor() {
        this.timer.style.color = '#2ecc40'
    }

    resetBall() {
        this.ball.position.x = this.board.size.width / 2
        this.ball.position.y = this.board.size.height / 2

        this.movementX = 0
        this.movementY = 0
    }

    endGame() {
        this.magicButton.className = 'notRunning'
        this.magicButton.innerHTML = 'RESET'
        this.stopTime()
        this.changeTimerColor()
        this.resetBall()
        this.magicButton.addEventListener('click', () => location.reload())
    }

    wallCollision(x, y) {
        const directionChange = -1

        if (x + this.ball.radius > this.board.size.width)
            this.movementX *= directionChange
        else if (x - this.ball.radius < this.board.canvas.clientLeft)
            this.movementX *= directionChange
        if (y + this.ball.radius > this.board.size.height)
            this.movementY *= directionChange
        else if (y - this.ball.radius < this.board.canvas.clientTop)
            this.movementY *= directionChange
    }

    elementsCollision(ball, hole) {
        if (Math.abs(ball.position.y - hole.position.y) < hole.radius
            && Math.abs(ball.position.x - hole.position.x) < hole.radius)
            return true
    }

    ballMovement() {
        let tempXPosition = this.ball.position.x + this.movementX
        let tempYPosition = this.ball.position.y + this.movementY

        this.ball.position.x = Math.min(tempXPosition, this.board.size.width - this.ball.radius)
        this.ball.position.x = Math.max(this.ball.position.x, this.board.canvas.clientLeft + this.ball.radius)
        this.ball.position.y = Math.min(tempYPosition, this.board.size.height - this.ball.radius)
        this.ball.position.y = Math.max(this.ball.position.y, this.board.canvas.clientTop + this.ball.radius)

        this.wallCollision(tempXPosition, tempYPosition)
    }

    ballAcceleration(element) {
        this.movementX = element.alpha * this.ball.acceleration
        this.movementY = element.beta * this.ball.acceleration

        this.ballMovement()
    }
  
    ballJump() {
        const numberToCut = 1
        const helpfulJump = 1

        this.holes.forEach(hole => {
            if (this.elementsCollision(this.ball, hole)) {
                this.removeHole(hole)
                this.holes.splice(this.holes.indexOf(hole), numberToCut)

                let nextHole = this.holes[Math.floor(Math.random() * this.holes.length)]

                this.ball.position.x = nextHole.position.x + hole.radius + helpfulJump
                this.ball.position.y = nextHole.position.y + hole.radius + helpfulJump

                this.removeHole(nextHole)
                this.holes.splice(this.holes.indexOf(nextHole), numberToCut)
            }
        })
    }

    ballAnimation() {
        const miliseconds = 50
        const empty = 0

        window.requestAnimationFrame(this.animation)
        this.drawBall(this.ball)
        this.holes.forEach(hole => {
            this.drawHole(hole)
        })
        this.ballMovement()
        this.ballJump()
        if (this.holes.length == empty) {
            setTimeout(()=> this.endGame(), miliseconds) 
        }
    }

    generateNumberOfHoles() {
        let tempNumber = 1
        const divider = 2
        const reminder = 0
        const minNumberOfHoles = 2
        const maxNumberOfHoles = 8

        while (tempNumber % divider != reminder)
            tempNumber = Math.floor(Math.random() * (maxNumberOfHoles - 1)) + minNumberOfHoles;

        return tempNumber
    }

}