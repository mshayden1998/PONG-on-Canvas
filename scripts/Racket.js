class Racket extends Element {
    constructor(isPlayer = false, posX, posY, color = 'rgb(255, 255, 255)', sizeX = 20, sizeY = 100, currentScore = 0) {
        super(posX, posY);
        this.isPlayer = isPlayer;
        this.color = color;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.currentScore = currentScore;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY);
    }
    moveUpOrDown() {
        if (this.isPlayer) {
            if (upPressed) {
                this.posY = Math.max(this.posY - 7, 0);
            } else if (downPressed) {
                this.posY = Math.min(this.posY + 7, canvas.height - this.sizeY);
            }
        }
    }
}