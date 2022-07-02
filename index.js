const canvas = document.getElementById('myCanvas')
canvas.width = 1094
canvas.height = 576

const c = canvas.getContext('2d')
c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({ color, position, speed }) {
        this.color = color
        this.position = position
        this.speed = speed
    }

    drawSprite() {
        const colorIsValid = this.color != null && this.color != '' 
        colorIsValid ? 
         c.fillStyle = this.color : 
         c.fillStyle = 'magenta'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }

    updateSprite() {
        this.drawSprite()
        this.position.y += this.speed.y
    }
}

const player = new Sprite({ 
    position: { x: 0, y: 0 },
    speed: { x: 0, y: 0 },
    color: 'red'
})
player.drawSprite()

const foe = new Sprite({
    color: 'blue',
    position: { x: 222, y: 0 },
    speed: { x: 0, y: 0 }
})
foe.drawSprite()

const animation = () => {
    console.log("Number increasing every 1s is showing the frame's speed.")
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.updateSprite()
    foe.updateSprite()
}

animation()


