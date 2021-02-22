
class Game {
    constructor(canvas, context, field, player, obstacleblueConstructor,  obstacleRedConstructor, obstacleGreyConstructor) {
        this.canvas = canvas;
        this.context = context;
        this.field = field;
        this.player = player;
        this.obstacleblueConstructor = obstacleblueConstructor;
        this.obstaclesBlue = [];
        this.obstacleblueSpeed = 5;
        this.obstacleRedConstructor = obstacleRedConstructor;
        this.obstaclesRed = [];
        this.obstacleredSpeed = 5;
        this.obstacleGreyConstructor = obstacleGreyConstructor;
        this.obstaclesGrey = [];
        this.obstaclegreySpeed = 5;
        this.newObstaclesFPS = 120;
        this.frogSpeed = {
            initialSpeed: 0,
            speedIncrement: 1,      ////// REVISISTAR ////////
        };
        this.frames = 0;
        this.isGamesOver = false;
        this.aimationId = 0;
        this.score = {
            points: 0,
            pointsIncrmentFPS: 30,
        }
        this.context.font = '60px Comisc Sans';
        this. context.fillStyle='red';
        

    }
    
    configureKeyboardControls() {
        document.onkeydown = (event) => {
            if (!this.isGamesOver) {
            this.frogSpeed.initialSpeed += this.frogSpeed.speedIncrement;      ////// REVISISTAR ////////
            
            this.player.movePlayer(event.keyCode, this.frogSpeed.initialSpeed);   ////// REVISISTAR ////////
            }
        };
    }

    startGame() {
        this.field.drawField();
        this.player.drawPlayer();
       
        this.creatObstaclesBlue();
        this.moveObstaclesBlue();
        this.checkClearObstaclesBlue();
        
        this.creatObstaclesRed();
        this.moveObstaclesRed();
        this.checkClearObstaclesRed();
        
        this.creatObstaclesGrey();
        this.moveObstaclesGrey();
        this.checkClearObstaclesGrey();
        
        this.checkCollisionBlue();
        this.checkCollisionRed();
        this.checkCollisionGrey();

        this.updateScore();
        
        this.frames += 1;
        
        if (this.isGamesOver) {
            window.cancelAnimationFrame(this.animationId);
            this.showFinalGameStats();
        } else {
            this.animationId = window.requestAnimationFrame(() => this.startGame());
        }

    }
    
    creatObstaclesBlue() {
        const obstacleBlueImg = new Image();
        obstacleBlueImg.src = './images/blueCar.png';
        if (this.frames % this.newObstaclesFPS === 0) {
            const newObstacles = new this.obstacleblueConstructor(this.canvas, this.context, this.canvas.width, 975, 300, 140, obstacleBlueImg);
            this.obstaclesBlue.push(newObstacles);
        }
    }
    moveObstaclesBlue() {
        this.obstaclesBlue.forEach((obstacle) => {
            obstacle.drawObstacleBlue();
            obstacle.moveObstacleBlue(this.obstacleblueSpeed);
        });
    }
    checkClearObstaclesBlue() {
        this.obstaclesBlue.forEach((obstacle, index) => {
            if (obstacle.posX <= -300) {
                this.obstaclesBlue.splice(index, 1);
            }
        });
    }
    checkCollisionBlue() {
        this.obstaclesBlue.forEach((obstacle) => {
            if (this.player.crashWith(obstacle)) {
              this.isGamesOver = true;
            }
        });
    }
    
    creatObstaclesRed() {
        const obstacleRedImg = new Image();
        obstacleRedImg.src = './images/redCar.png';
        if (this.frames % this.newObstaclesFPS === 0) {
            const newObstaclesRed = new this.obstacleRedConstructor(this.canvas, this.context, this.canvas.width, 850, 240, 129, obstacleRedImg);
            this.obstaclesRed.push(newObstaclesRed);
        }
    }
    moveObstaclesRed() {
        this.obstaclesRed.forEach((obstacle) => {
            obstacle.drawObstacleRed();
            obstacle.moveObstacleRed(this.obstacleredSpeed);
        });
    }
    checkClearObstaclesRed() {
        this.obstaclesRed.forEach((obstacle, index) => {
            if (obstacle.posX <= -240) {
                this.obstaclesRed.splice(index, 1);
            }
        });
    }
    checkCollisionRed() {
        this.obstaclesRed.forEach((obstacle) => {
            if (this.player.crashWith(obstacle)) {
              this.isGamesOver = true;
            }
        });
    }
    
    creatObstaclesGrey() {
        const obstacleGreyImg = new Image();
        obstacleGreyImg.src = './images/greyCar.png';
        if (this.frames % this.newObstaclesFPS === 0) {
            const newObstaclesGrey = new this.obstacleGreyConstructor(this.canvas, this.context, -240, 670, 240, 160, obstacleGreyImg);
            this.obstaclesGrey.push(newObstaclesGrey);
        }
    }
    moveObstaclesGrey() {
        this.obstaclesGrey.forEach((obstacle) => {
            obstacle.drawObstacleGrey();
            obstacle.moveObstacleGrey(this.obstaclegreySpeed);
        });
    }
    checkClearObstaclesGrey() {
        this.obstaclesGrey.forEach((obstacle, index) => {
            if (obstacle.posX <= -240) {
                this.obstaclesGrey.splice(index, 1);
            }
        });
    }
    checkCollisionGrey() {
        this.obstaclesGrey.forEach((obstacle) => {
            if (this.player.crashWith(obstacle)) {
              this.isGamesOver = true;
            }
        });
    }

    updateScore() {
        if (this.frames % this.score.pointsIncrmentFPS) {
            this.score.points += 1;
        }

        this.drawScore();
    }

    drawScore() {
        this.context.fillText(`SCORE: ${this.score.points}`, 25, 50);
    }

    showFinalGameStats() {
        setTimeout(() => {
            this.context.textAlign='center';
            this.context.font = '100px Comic Sans';
            this.context.fillStyle = 'red';
            this.context.fillText('Games Over', this.canvas.width / 2, this.canvas.height / 3);

            this.context.fillStyle = 'balck';
            this.context.fillText(`Your final score is: ${this.score.points}`, this.canvas.width / 2, this.canvas.height / 3 + 140);

        }, 1000);
    }
    

}

window.onload = () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    const fieldImg = new Image();
    fieldImg.src = './images/road.png';

    const frogImg = new Image();
    frogImg.src = './images/frog.png';

    fieldImg.onload = () => {
        frogImg.onload = () => {
        const field = new Field(canvas, context, 0, 0, canvas.width, canvas.height, fieldImg);
        
        const player = new Player(canvas, context, 800, 1070, 80, 160, frogImg);
       
        const game = new Game(canvas, context, field, player, ObstaclesBlue, ObstaclesRed, ObstaclesGrey);
        
        game.configureKeyboardControls();
        game.startGame();
    };
    }; 
};
