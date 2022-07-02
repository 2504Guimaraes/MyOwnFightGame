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
        
        const spriteHasReachedTheBottom = this.position.y + this.height + 
        this.speed.y >= canvas.height
        
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
    d: { pressed: false },
    a: { pressed: false },
    w: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false }
}

let player_ = { lastKey: null }
let foe_ = { lastKey: null }

// let lstKeyPressed = null

const animation = () => {
    console.log("Number increasing every 1s is showing the frame's speed.")
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.updateSprite()
    foe.updateSprite()

    // Player's original movement:
    // player.speed.x = 0
    // if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight')
    //     player.speed.x = 1
    // else if (keys.ArrowLeft.pressed && lstKeyPressed === 'ArrowLeft')
    //     player.speed.x = -1

    player.speed.x = 0
    foe.speed.x = 0

    // Player's movement:
    if (keys.d.pressed && player_.lastKey === 'd')
        player.speed.x = 4
    else if (keys.a.pressed && player_.lastKey === 'a')
        player.speed.x = -4

    // Foe's movement:
    if (keys.ArrowRight.pressed && foe_.lastKey === 'ArrowRight')
        foe.speed.x = 4
    else if (keys.ArrowLeft.pressed && foe_.lastKey === 'ArrowLeft')
        foe.speed.x = -4
}
animation()

window.addEventListener('keydown', (keyboradClickEvent) => {
    switch(keyboradClickEvent.key) {
        case 'd':
            keys.d.pressed = true
            player_.lastKey = 'd'
            console.log("Player's going [→]")
            break
        case 'a':
            keys.a.pressed = true
            player_.lastKey = 'a'
            console.log("Player's going [←]")
            break
        case 'w':
            player.speed.y = -10
            console.log("Player jumped [↑]")
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            foe_.lastKey = 'ArrowRight'
            console.log("Foe's going [→]")
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            foe_.lastKey = 'ArrowLeft'
            console.log("Foe's going [←]")
            break
        case 'ArrowUp':
            foe.speed.y = -10
            console.log("Foe jumped [↑]")
            break
    }
})

window.addEventListener('keyup', (keyboradClickEvent) => {
    switch(keyboradClickEvent.key) {
        case 'd':
            keys.d.pressed = false
            console.log('Player Stopped')
            break
        case 'a':
            keys.a.pressed = false
            console.log('Player Stopped')
            break
        case 'w':
            keys.w.pressed = false
            console.log('Player Stopped')
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            console.log('Foe Stopped')
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            console.log('Foe Stopped')
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            console.log('Foe Stopped')
            break
    }
})

