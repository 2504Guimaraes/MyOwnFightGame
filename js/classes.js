class Sprite {
    constructor({ position, imgSrc, imgScale = 1 }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.img = new Image()
        this.img.src = imgSrc
        this.scale = imgScale
    }

    drawSprite() {
        c.drawImage(
            this.img, 
            this.position.x, 
            this.position.y,
            this.img.width * this.scale,
            this.img.height * this.scale
        )
    }

    updateSprite() {
        this.drawSprite()
    }
}

class Fighter {
    constructor({ color, position, speed, offset }) {
        this.color = color
        this.position = position
        this.speed = speed
        this.width = 50
        this.height = 150
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.isAttacking = false
        this.health = 100
        this.lastKey = null

        const N = 0.3
        /* 
            NOTE: "N" above [↑] is a tinny width value made 
            to make the characters' health bar look
            cleaner. Besides, it only affects the bars' 
            CSS appearance and not the characters' health 
            property in itself.
        */
        getElmnt('#playerBar')
            .style.width = `${this.health + N}%`
        getElmnt('#foeBar')
            .style.width = `${this.health + N}%`
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
        
        this.attackBox.position.x = 
            this.position.x - this.attackBox.offset.x
        
        this.attackBox.position.y = 
            this.position.y

        this.position.x += this.speed.x
        this.position.y += this.speed.y
        
        const groundHeight = 96
        const spriteHasReachedTheBottom = 
            this.position.y + this.height + 
            this.speed.y >= (canvas.height - groundHeight)

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