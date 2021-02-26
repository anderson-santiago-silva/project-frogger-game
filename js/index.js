///// Incluir o Winner //////   --- OK
///// Rotacionar player /////
///// Incluir o restart //////
///// Ajustar navegação //////  --- MAIS OU MENOS 
///// Ajustar sistema de pontos /////
///// Incluir setTimout randomico para os obstáculos /////  --- MAIS OU MENOS
///// Colocar trilha sonora //////   --- MAIS OU MENOS

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
        this.obstacleredSpeed = 10;
        this.obstacleGreyConstructor = obstacleGreyConstructor;
        this.obstaclesGrey = [];
        this.obstaclegreySpeed = 10;
        this.newObstaclesFPS = [120, 60];
        this.newObstcleFPSindex = 0;
        this.frogSpeed = {
            initialSpeed: 70,
            speedIncrement: 0,      ////// REVISISTAR ////////
        };
        this.frames = 0;
        this.isGameOver = false;
        this.winnerGame = false;
        this.score = {
            points: 0,
            pointsIncrmentFPS: 30,
        }
        this.context.font = '60px Comisc Sans';
        this. context.fillStyle='red';
    }
    
    configureKeyboardControls() {
        document.onkeydown = (event) => {
            if (!this.isGameOver || this.winnerGame) {
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

        this.winnerPlayer();

        this.updateScore();

        this.frames += 1;
        
        if (this.isGameOver || this.winnerGame) {
            window.cancelAnimationFrame(this.animationId);
            this.showFinalGameStats();
        } else {
            this.animationId = window.requestAnimationFrame(() => this.startGame());
        }

    }
    
    creatObstaclesBlue() {
        const obstacleBlueImg = new Image();
        obstacleBlueImg.src = './images/blueCar.png';
        if (this.frames % this.newObstaclesFPS[this.newObstcleFPSindex] === 0) {
            this.newObstcleFPSindex = Math.floor(Math.random() * this.newObstaclesFPS.length) 
            const newObstacles = new this.obstacleblueConstructor(this.canvas, this.context, this.canvas.width, 995, 200, 95, obstacleBlueImg);
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
              this.isGameOver = true;
            }
        });
    }
    
    creatObstaclesRed() {
        const obstacleRedImg = new Image();
        obstacleRedImg.src = './images/policeCar.png';
        if (this.frames % this.newObstaclesFPS[this.newObstcleFPSindex] === 0) {
            this.newObstcleFPSindex = Math.floor(Math.random() * this.newObstaclesFPS.length)
            const newObstaclesRed = new this.obstacleRedConstructor(this.canvas, this.context, this.canvas.width + 200, 850, 200, 115, obstacleRedImg);
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
              this.isGameOver = true;
            }
        });
    }
    
    creatObstaclesGrey() {
        const obstacleGreyImg = new Image();
        obstacleGreyImg.src = './images/greyCar.png';
        if (this.frames % this.newObstaclesFPS[this.newObstcleFPSindex] === 0) {
            this.newObstcleFPSindex = Math.floor(Math.random() * this.newObstaclesFPS.length)
            const newObstaclesGrey = new this.obstacleGreyConstructor(this.canvas, this.context, -240, 690, 218, 120, obstacleGreyImg);
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
            if (obstacle.posX > this.canvas.width) {
                this.obstaclesGrey.splice(index, 1);
            }
        });
    }
    checkCollisionGrey() {
        this.obstaclesGrey.forEach((obstacle) => {
            if (this.player.crashWith(obstacle)) {
              this.isGameOver = true;
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
        this.context.fillText(`SCORE: ${this.score.points}`, 50, 100);
    }

    showFinalGameStats() {
        if (this.isGameOver == true) {
        setTimeout(() => {
            this.context.fillStyle = 'rgb(200,94,70)';
                this.context.fillRect(350, 300, 1010, 300);
            this.context.textAlign='center';
            this.context.font = '100px Comic Sans';
            this.context.fillStyle = 'white';
            this.context.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 3);

            this.context.fillStyle = 'balck';
            this.context.fillText(`Your final score is: ${this.score.points}`, this.canvas.width / 2, this.canvas.height / 3 + 140);
        }, 1000);
        } 
            if (this.winnerGame == true) {
            setTimeout(() => {
                this.context.fillStyle = 'rgb(91,150,70)';
                this.context.fillRect(350, 300, 1010, 300);
                this.context.textAlign='center';
                this.context.font = '100px Comic Sans';
                this.context.fillStyle = 'white';
                this.context.fillText('You win!', this.canvas.width / 2, this.canvas.height / 3);
                

                this.context.fillStyle = 'white';
                this.context.fillText(`Your final score is: ${this.score.points}`, this.canvas.width / 2, this.canvas.height / 3 + 140);
            }, 1000);
        }
    }

    winnerPlayer() {
        const position = this.player.getPositionY()
       
        if (position == 600) {
            this.winnerGame = true;
            
        }
    }
    
}

window.onload = () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    const fieldImg = new Image();
    fieldImg.src = './images/road.png';

    const frogImg = new Image();
    frogImg.src = './images/frogN.png';
    
    fieldImg.onload = () => {
        frogImg.onload = () => {
        const field = new Field(canvas, context, 0, 0, canvas.width, canvas.height, fieldImg);
        
        const player = new Player(canvas, context, 800, 1110, 50, 70, frogImg);
       
        const game = new Game(canvas, context, field, player, ObstaclesBlue, ObstaclesRed, ObstaclesGrey);
        
        game.configureKeyboardControls();
        game.startGame();
    };
    }; 
};

