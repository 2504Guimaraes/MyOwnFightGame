const canvas = document.getElementById('myCanvas')
canvas.width = 1094
canvas.height = 576

const c = canvas.getContext('2d')
c.fillRect(0, 0, canvas.width, canvas.height)

const gravitySpeed = 0.65

class Sprite {
    constructor({ color, position, speed }) {
        this.color = color
        this.position = position
        this.speed = speed
        this.height = 150
    }

    drawSprite() {
        const colorIsValid = this.color != null && this.color != '' 
        colorIsValid ? 
            c.fillStyle = this.color : 
            c.fillStyle = 'magenta'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    updateSprite() {
        this.drawSprite()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        
        const spriteHasReachedTheBottom = this.position.y + this.height + this.speed.y >= canvas.height
        spriteHasReachedTheBottom ? 
            this.speed.y = 0 :
            this.speed.y += gravitySpeed
    }
}

const player = new Sprite({ 
    position: { x: 100, y: 0 },
    speed: { x: 0, y: 0 },
    color: 'red'
})
player.drawSprite()

const foe = new Sprite({
    color: 'blue',
    position: { x: 322, y: 0 },
    speed: { x: 0, y: 0 }
})
foe.drawSprite()

const keys = {
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false }
}

let lstKeyPressed = null

const animation = () => {
    console.log("Number increasing every 1s is showing the frame's speed.")
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.updateSprite()
    foe.updateSprite()

    player.speed.x = 0
    if (keys.ArrowRight.pressed && lstKeyPressed === 'ArrowRight')
        player.speed.x = 1
    else if (keys.ArrowLeft.pressed && lstKeyPressed === 'ArrowLeft')
        player.speed.x = -1
}
animation()

window.addEventListener('keydown', (keyboradClickEvent) => {
    switch(keyboradClickEvent.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lstKeyPressed = 'ArrowRight'
            console.log("Player's going [→]")
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lstKeyPressed = 'ArrowLeft'
            console.log("Player's going [←]")
            break
        case 'ArrowUp':
            player.speed.y = -10
            console.log("Player jumped [↑]")
            break
    }
})

window.addEventListener('keyup', (keyboradClickEvent) => {
    switch(keyboradClickEvent.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            console.log('Player Stopped')
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            console.log('Player Stopped')
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            console.log('Player Stopped')
            break
    }
})

