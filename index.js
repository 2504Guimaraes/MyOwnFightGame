const canvas = document.getElementById('myCanvas')
canvas.width = 1094
canvas.height = 576

const c = canvas.getContext('2d')
c.fillRect(0, 0, canvas.width, canvas.height)

const gravitySpeed = 0.2

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
    position: { x: 0, y: 0 },
    speed: { x: 0, y: 5 },
    color: 'red'
})
player.drawSprite()

const foe = new Sprite({
    color: 'blue',
    position: { x: 122, y: 0 },
    speed: { x: 0, y: 0 }
})
foe.drawSprite()

const keys = {
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false }
}

const animation = () => {
    console.log("Number increasing every 1s is showing the frame's speed.")
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.updateSprite()
    foe.updateSprite()

    player.speed.x = 0

    if (keys.ArrowRight.pressed)
        player.speed.x = 1
    else if (keys.ArrowLeft.pressed)
        player.speed.x = -1
}
animation()

const showKPressed = key => console.log(key) 

window.addEventListener('keydown', (keyboradClickEvent) => {
    switch(keyboradClickEvent.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            showKPressed("Player's going right [→]")
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            showKPressed("Player's going left [←]")
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
    }
})

