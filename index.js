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
        this.width = 50
        this.height = 150
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.isAttacking = false
    }

    drawSprite() {
        const colorIsValid = this.color != null && 
            this.color != ''

        colorIsValid ? 
            c.fillStyle = this.color : 
            c.fillStyle = 'magenta'

        c.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        )

        // drawing attack box only if player attacks:
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
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

    attack() {
        this.isAttacking = true
        setTimeout(() => { 
            this.isAttacking = false 
        }, 100)
    }
}

const player = new Sprite({ 
    position: { x: 150, y: 0 },
    speed: { x: 0, y: 0 },
    color: 'red'
})
player.drawSprite()

const foe = new Sprite({
    color: 'blue',
    position: { x: 350, y: 0 },
    speed: { x: 0, y: 0 }
})
foe.drawSprite()

const keys = {
    // player's keys:
    d: { pressed: false },
    a: { pressed: false },
    w: { pressed: false },

    // foe's keys:
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowUp: { pressed: false }
}

let player_ = { lastKey: null }
let foe_ = { lastKey: null }

const animation = () => {
    // Message bellow shows frame's speed:
    // console.log("Number increasing every 1s is showing the frame's speed.")
    // Animation infinity loop:
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.updateSprite()
    foe.updateSprite()

    // 1. Player's and Foe's default speeds:
    player.speed.x = 0
    foe.speed.x = 0
    // 2. Player's movement:
    if (keys.d.pressed && player_.lastKey === 'd')
        player.speed.x = 4
    else if (keys.a.pressed && player_.lastKey === 'a')
        player.speed.x = -4
    // 3. Foe's movement:
    if (keys.ArrowRight.pressed && foe_.lastKey === 'ArrowRight')
        foe.speed.x = 4
    else if (keys.ArrowLeft.pressed && foe_.lastKey === 'ArrowLeft')
        foe.speed.x = -4
    
    // 4. Detect for collisions:
    if (player.attackBox.position.x + player.attackBox.width >= foe.position.x && 
        player.attackBox.position.x <= foe.position.x + foe.width && 
        player.attackBox.position.y + player.attackBox.height >= foe.position.y 
        && player.attackBox.position.y <= foe.position.y + foe.height &&
        player.isAttacking
    ) {
        player.isAttacking = false
        console.log('<<< Foe hit <<<')
    }
}
animation()

window.addEventListener('keydown', (keyboardClickEvent) => {
    switch(keyboardClickEvent.key) {
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
        case ' ':
            player.attack()
            console.log(">>> Player Attacked! >>>")
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

window.addEventListener('keyup', (keyboardClickEvent) => {
    switch(keyboardClickEvent.key) {
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

