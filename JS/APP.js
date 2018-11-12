
var Enemy = function(A,B,speed) {
    
    this.A = A;
    this.B = B;
    this.speed = speed;
    
    this.sprite = 'Image/enemy-bug.png';
};

Enemy.prototype.update = function(S) {
   
    if(this.A < 8*101){
        this.A+=(S * this.speed);
    }else{
        this.A=-2* 83;
		this.speed = 100 + Math.floor(Math.random() * this.speed);
    }
	
	// Check for collision
    if(player.A < this.A + 70 &&
        player.A > this.A -55 &&
        player.B < this.B + 55 &&
        player.B > this.B - 65) {
        player.A = 2 * 101;
        player.B = 4.75 * 83;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.A, this.B);
};


var Player = function(A,B){
    this.A = A;
    this.B = B;
    this.sprite = 'Image/char-princess-girl.png';
};
Player.prototype.update = function(Q) {
	if (this.A < 0) {
		this.A = 0;
	}
	if (this.A > 5 * 101) {
		this.A = 5 * 101;
	}

	if (this.B > 4.75 * 83) {
		this.B = 4.75 * 83;
	}
	
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.A, this.B);
};

Player.prototype.handleInput = function(direction){

    switch (direction){
        case 'left':
			this.A -= 101;
            break;
        case 'up':
			if(this.B - 101 <= 0){
				_score();
				this.A = 2 * 101;
				this.B = 4.75 * 83;
			} else {
				this.B -= 83;
			}
            break;
        case 'right':
			this.A += 101;
            break;
        case 'down':
            this.B += 83;
            break;
    }
};

var allEnemies = [];

var enemy1 = new Enemy(0 * 101, 0.75 * 83, 300),
    enemy2 = new Enemy(2 * 101, 0.75 * 83, 200),
    enemy3 = new Enemy(0 * 101, 1.75 * 83, 400),
    enemy4 = new Enemy(3 * 101, 1.75 * 83, 500),
    enemy5 = new Enemy(1 * 101, 2.75 * 83, 200),
    enemy6 = new Enemy(4 * 101, 2.75 * 83, 300);
allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5,enemy6);


var player =  new Player(2 * 101, 4.75 * 83);

let score = document.getElementById("score");
let playerScore = parseInt(score.innerText);

function _score(){
    playerScore += 1;
    score.innerText = playerScore;
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'left',
        87: 'up', 
        68: 'right',
        83: 'down' 
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
