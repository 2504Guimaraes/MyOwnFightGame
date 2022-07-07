const canvas = getElmnt('#myCanvas')
canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d')
c.fillRect(0, 0, canvas.width, canvas.height)

const gravitySpeed = 0.65

const background = new Sprite({
    position: { x: 0, y: 0 },
    imgSrc: './img/background.png'
})

const shop = new Sprite({
    position: { x: 600, y: 128 },
    imgSrc: './img/shop.png',
    imgScale: 2.75,
    frameMax: 6 // how many times our img gonna be cropped
})

const player = new Fighter({
    position: { x: 150, y: 0 },
    speed: { x: 0, y: 0 },
    imgSrc: './img/player1/idle.png',
    frameMax: 8,
    imgScale: 2.5,
    offset: { x: 215, y: 157 },
    sprites: {
        idle: {
            imgSrc: './img/player1/Idle.png',
            frameMax: 8
        },
        run: {
            imgSrc: './img/player1/Run.png',
            frameMax: 8
        },
        jump: {
            imgSrc: './img/player1/Jump.png',
            frameMax: 2
        },
        fall: {
            imgSrc: './img/player1/Fall.png',
            frameMax: 2
        },
        attack1: {
            imgSrc: './img/player1/Attack1.png',
            frameMax: 6
        },
        takeHit: {
            imgSrc: './img/player1/Takehit.png',
            frameMax: 4
        }
    },
    attackBox: {
        offset: { x: -70, y: 50 },
        width: 180,
        height: 50
    }
})
player.drawSprite()

const foe = new Fighter({
    position: { x: 520, y: 0 },
    speed: { x: 0, y: 0 },
    imgSrc: './img/player2/idle.png',
    frameMax: 4,
    imgScale: 2.5,
    offset: { x: 215, y: 157 },
    sprites: {
        idle: {
            imgSrc: './img/player2/Idle.png',
            frameMax: 4
        },
        run: {
            imgSrc: './img/player2/Run.png',
            frameMax: 8
        },
        jump: {
            imgSrc: './img/player2/Jump.png',
            frameMax: 2
        },
        fall: {
            imgSrc: './img/player2/Fall.png',
            frameMax: 2
        },
        attack1: {
            imgSrc: './img/player2/Attack1.png',
            frameMax: 4
        },
        takeHit: {
            imgSrc: './img/player2/Takehit.png',
            frameMax: 3
        }
    },
    attackBox: {
        offset: { x: 175, y: 50 },
        width: 180,
        height: 50
    }
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

decreaseTimer()

const animation = () => {
    // Message bellow shows frame's speed:
    // console.log("Number increasing every 1s is showing the frame's speed.")
    // Animation infinity loop:
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.updateSprite()
    shop.updateSprite()
    player.updateSprite()
    foe.updateSprite()

    // 1. Player's and Foe's default speeds:
    player.speed.x = 0
    foe.speed.x = 0
    // 2. Player's movement:
    if (keys.d.pressed && player.lastKey === 'd') {
        player.speed.x = 4
        player.switchSprite('run')
    }
    else if (keys.a.pressed && player.lastKey === 'a') {
        player.speed.x = -4
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }

    // When player's jumping:
    if (player.speed.y < 0) {
        player.switchSprite('jump')
    }
    else if (player.speed.y > 0) {
        player.switchSprite('fall')
    }


    // 3. Foe's movement:
    if (keys.ArrowRight.pressed && foe.lastKey === 'ArrowRight') {
        foe.speed.x = 4
        foe.switchSprite('run')
    }
    else if (keys.ArrowLeft.pressed && foe.lastKey === 'ArrowLeft') {
        foe.speed.x = -4
        foe.switchSprite('run')
    }
    else {
        foe.switchSprite('idle')
    }

    // When foe's jumping:
    if (foe.speed.y < 0) {
        foe.switchSprite('jump')
    }
    else if (foe.speed.y > 0) {
        foe.switchSprite('fall')
    }


    // 4.1 Detect PLAYER'S collisions on both X and Y axes:
    if (
        retangularCollision({ 
            rectan1: player, 
            rectan2: foe 
        }) 
        && player.isAttacking
        && player.framesStart === 4
    ) {
        foe.takeHit(2)
        console.log('<<< Foe hit by Player!!! <<<')
        player.isAttacking = false
    }

    // if player's missing:
    if (player.isAttacking && player.framesStart === 4)
        player.isAttacking = false   


    // 4.2 Detect FOE'S collisions on both X and Y axes:
    if (
        retangularCollision({ 
            rectan1: foe, 
            rectan2: player 
        }) 
        && foe.isAttacking
        && foe.framesStart === 2
    ) {
        player.takeHit(1)
        console.log('<<< Player hit by Foe!!! <<<')
        foe.isAttacking = false
    }

    // 5. Defines who won based on their health even before timer runs out:
    if (player.health == 0 || foe.health == 0)
        determineWinner({ player, foe, timerCall })
}
animation()

window.addEventListener('keydown', (keyboardClickEvent) => {
    switch(keyboardClickEvent.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            console.log("Player's going [→]")
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            console.log("Player's going [←]")
            break
        case 'w':
            player.speed.y = -10
            console.log("Player jumped [↑]")
            break
        case ' ': // Space key:
            player.attack()
            console.log(">>> Player Attacked! >>>")
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            foe.lastKey = 'ArrowRight'
            console.log("Foe's going [→]")
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            foe.lastKey = 'ArrowLeft'
            console.log("Foe's going [←]")
            break
        case 'ArrowUp':
            foe.speed.y = -10
            console.log("Foe jumped [↑]")
            break
        case 'ArrowDown':
            foe.attack()
            console.log(">>> Foe Attacked! >>>")
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

