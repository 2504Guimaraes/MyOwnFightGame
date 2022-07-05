const getElmnt = tpdId => document.querySelector(tpdId)

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
        const msg = 'Player Victory!!!'
        getElmnt('#tieWarning').innerText = msg
        getElmnt('#tieWarning').style.display = 'block'
    }
    else if (player.health < foe.health) {
        const msg = 'Foe Victory!!!'
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