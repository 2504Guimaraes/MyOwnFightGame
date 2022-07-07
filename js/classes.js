class Sprite {
    constructor({ 
        position, 
        imgSrc, 
        imgScale = 1, 
        frameMax = 1, 
        offset = { x: 0, y: 0 }
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.img = new Image()
        this.img.src = imgSrc
        this.scale = imgScale
        this.frameMax = frameMax
        this.framesStart = 0
        this.framesElapsed = 0
        this.framesHold = 5,
        this.offset = offset
    }

    drawSprite() {
        const whereXgonnaBe = 
            this.framesStart * 
            (this.img.width / this.frameMax)

        c.drawImage(
            this.img, 
            
            whereXgonnaBe,                     // X axis from where cropped img starts
            0,                                 // Y axis from where cropped img starts
            (this.img.width / this.frameMax),  // Cropped img width 
            this.img.height,                   // Cropped img height (All for our loop/animation effect).

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y,
            (this.img.width / this.frameMax) * this.scale,
            this.img.height * this.scale
        )
    }

    animateFrame() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            this.framesStart < this.frameMax - 1 ?
                this.framesStart++ :
                this.framesStart = 0
        }
    }

    updateSprite() {
        this.drawSprite()
        this.animateFrame()
    }
}

class Fighter extends Sprite {
    constructor({  
        position, 
        speed, 
        imgSrc, 
        imgScale = 1, 
        frameMax = 1,
        offset = { x: 0 , y: 0  },
        sprites
    }) {
        super({ 
            position,
            imgSrc, 
            imgScale, 
            frameMax,
            offset
        })
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

        this.framesStart = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        
        for (const sprite in this.sprites) {
            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc
        }
        console.log(this.sprites)
    }

    updateSprite() {
        this.drawSprite()
        this.animateFrame()

        this.attackBox.position.x = 
            this.position.x - this.attackBox.offset.x
        
        this.attackBox.position.y = 
            this.position.y

        this.position.x += this.speed.x
        this.position.y += this.speed.y
        

        // Gravity function:
        const groundHeight = 96
        const spriteHasReachedTheBottom = 
            this.position.y + this.height + 
            this.speed.y >= (canvas.height - groundHeight)

        if (spriteHasReachedTheBottom) {
            this.speed.y = 0 
            this.position.y = 330
        }
        else this.speed.y += gravitySpeed
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(() => { 
            this.isAttacking = false 
        }, 100)
    }

    switchSprite(sprite) {
        if (
            this.img === this.sprites.attack1.img &&
            this.framesStart < this.sprites.attack1.frameMax - 1
        ) 
            return
        
        switch(sprite) {
            case 'idle':
                if (this.img != this.sprites.idle.img) {
                    this.img = this.sprites.idle.img
                    this.frameMax = this.sprites.idle.frameMax 
                    this.framesStart = 0
                }
                break 
            case 'run':
                if (this.img != this.sprites.run.img) {
                    this.img = this.sprites.run.img
                    this.frameMax = this.sprites.run.frameMax 
                    this.framesStart = 0
                }
                break
            case 'jump':
                if (this.img != this.sprites.jump.img) {
                    this.img = this.sprites.jump.img
                    this.frameMax = this.sprites.jump.frameMax
                    this.framesStart = 0
                }
                break
            case 'fall':
                if (this.img != this.sprites.fall.img) {
                    this.img = this.sprites.fall.img
                    this.frameMax = this.sprites.fall.frameMax
                    this.framesStart = 0
                }
                break
            case 'attack1':
                if (this.img != this.sprites.attack1.img) {
                    this.img = this.sprites.attack1.img
                    this.frameMax = this.sprites.attack1.frameMax
                    this.framesStart = 0
                }
                break
        }
    }
}