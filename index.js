const getElmnt = tpdId => document.querySelector(tpdId) 

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

const player = new Fighter({
    position: { x: 150, y: 0 },
    speed: { x: 0, y: 0 },
    color: 'red', 
    offset: { x: 0, y: 0 } 
})
player.drawSprite()

const foe = new Fighter({
    color: 'blue',
    position: { x: 350, y: 0 },
    speed: { x: 0, y: 0 },
    offset: { x: 50, y: 0 }
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

const retangularCollision = ({ rectan1, rectan2 }) => {
    return (
        rectan1.attackBox.position.x + rectan1.attackBox.width >= 
            rectan2.position.x && 
        rectan1.attackBox.position.x <= 
            rectan2.position.x + rectan2.width && 
        rectan1.attackBox.position.y + rectan1.attackBox.height >= 
            rectan2.position.y && 
        rectan1.attackBox.position.y <= 
            rectan2.position.y + rectan2.height
    )
}

const determineWinner = ({ player, foe, timerCall }) => {
    const stopTimerCall = (timerCall) => {
        timerCall = null
        timer = 0
    }
    stopTimerCall()
    
    if (player.health == foe.health) {
        getElmnt('#tieWarning').style.display = 'block'
    }
    else if (player.health > foe.health) {
        const msg = 'Player Victory'
        getElmnt('#tieWarning').innerText = msg
        getElmnt('#tieWarning').style.display = 'block'
    }
    else if (player.health < foe.health) {
        const msg = 'Foe Victory'
        getElmnt('#tieWarning').innerText = msg
        getElmnt('#tieWarning').style.display = 'block'
    }
}

let timer = 61
let timerCall = null

const decreaseTimer = () => {
    if (timer > 0) {
        timer -= 1
        getElmnt('#timer').innerText = timer
        timerCall = setTimeout(decreaseTimer, 1000)
    }
    if (timer == 0)
        determineWinner({ player, foe, timerCall })
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
    player.updateSprite()
    foe.updateSprite()

    // 1. Player's and Foe's default speeds:
    player.speed.x = 0
    foe.speed.x = 0
    // 2. Player's movement:
    if (keys.d.pressed && player.lastKey === 'd')
        player.speed.x = 4
    else if (keys.a.pressed && player.lastKey === 'a')
        player.speed.x = -4
    // 3. Foe's movement:
    if (keys.ArrowRight.pressed && foe.lastKey === 'ArrowRight')
        foe.speed.x = 4
    else if (keys.ArrowLeft.pressed && foe.lastKey === 'ArrowLeft')
        foe.speed.x = -4
    
    // 4.1 Detect PLAYER'S collisions on both X and Y axes:
    if (
        retangularCollision({ 
            rectan1: player, 
            rectan2: foe 
        }) 
        && player.isAttacking
    ) {
        console.log('<<< Foe hit by Player!!! <<<')
        player.isAttacking = false
        // WARNING: The parseInt() function makes our CSS width value, which's 100.3% turn to 100%
        const newLifeValue = parseInt(getElmnt('#foeBar').style.width) - 20
        foe.health = newLifeValue
        getElmnt('#foeBar').style.width = `${newLifeValue}%`
    }

    // 4.2 Detect FOE'S collisions on both X and Y axes:
    if (
        retangularCollision({ 
            rectan1: foe, 
            rectan2: player 
        }) 
        && foe.isAttacking
    ) {
        console.log('<<< Player hit by Foe!!! <<<')
        foe.isAttacking = false
        // WARNING: The parseInt() function makes our CSS width value, which's 100.3% turn to 100%
        const newLifeValue = parseInt(getElmnt('#playerBar').style.width) - 20
        player.health = newLifeValue
        getElmnt('#playerBar').style.width = `${newLifeValue}%`
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

