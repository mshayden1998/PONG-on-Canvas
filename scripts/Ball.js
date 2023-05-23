class Ball extends Element {
    constructor(active = false, color = 'rgb(96, 245, 66)', size = 20, dirX = 2, dirY = -2, posX = canSizeX / 2, posY = canSizeY / 2) {
        super(posX, posY);
        this.active = active;
        this.color = color;
        this.size = size;
        this.dirX = dirX;
        this.dirY = dirY;
    }

    moveAround() {
        if (this.active) {
            this.posX += this.dirX;
            this.posY += this.dirY;
        }
    }

    bounceOff() {
        if (this.posX <= 0 || this.posX + this.size >= canvas.width) { // Bounces off left and right.
            this.dirX = -this.dirX;
        }
        if (this.posY <= 0 || this.posY + this.size >= canvas.height) {
            this.dirY = -this.dirY;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.size, this.size);
    }
}