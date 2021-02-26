
class Object {
    constructor(canvas, context, posX, posY, width, height) {
        this.canvas = canvas;
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }

    top () {
        return this.posY;
    } 
    bottom() {
        return this.posY + this.height;
    }
    left() {
        return this.posX;
    }
    right() {
        return this.posX + this.width;
    }
    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }

    getPositionY () {
        return this.posY
    }

}

class Field extends Object {
    constructor(canvas, context, posX, posY, width, height, image){
        super(canvas, context, posX, posY, width, height);
        this.image = image;
    }

    drawField() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);        
    }
}

class ObstaclesBlue extends Object {
    constructor(canvas, context, posX, posY, width, height, image){
        super(canvas, context, posX, posY, width, height);
        this.image = image;
    }

    drawObstacleBlue(){
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    moveObstacleBlue(speed) {
        this.posX -= speed;
    }
}

class ObstaclesRed extends Object {
    constructor(canvas, context, posX, posY, width, height, image){
        super(canvas, context, posX, posY, width, height);
        this.image = image;
    }

    drawObstacleRed(){
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    moveObstacleRed(speed) {
        this.posX -= speed;
    }
}

class ObstaclesGrey extends Object {
    constructor(canvas, context, posX, posY, width, height, image){
        super(canvas, context, posX, posY, width, height);
        this.image = image;
    }

    drawObstacleGrey(){
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    moveObstacleGrey(speed) {
        this.posX += speed;
    }
}

class Player extends Object {
    constructor(canvas, context, posX, posY, width, height, image){
        super(canvas, context, posX, posY, width, height);
        this.image = image;
    }

    drawPlayer() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    movePlayer(keyCode, speed) {
        switch (keyCode) {
            case 37:
                if(this.posX <= 30) {
                    this.posX = 30
                    return;
                } 
              this.posX -= speed;
              break;
            case 38:
                if (this.posY <= 600) {
                    this.posY = 600
                    return;
                }
                if(this.posY < 570) return;
              this.posY -= speed;
              break;
            case 39:
                if(this.posX >= this.canvas.width - 80) {
                    this.posX = this.canvas.width - 80
                    return
                }
              this.posX += speed;
              break;
            case 40:
                if(this.posY >= 1110) {
                    this.posY = 1110
                    return;
                }
              this.posY += speed;
              break;
            default:
                console.log('Invalid Key')
        }
        
    }

}
