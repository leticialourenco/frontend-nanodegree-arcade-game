'use strict';

/* Helper variables
 * Rows where enemies can be generated + variable helper used
 * to select the position in the array
 */
var enemyRows = [60, 145, 230];
var index;

/* Enemies our player must avoid */
var Enemy = function() {
    /* Variables applied to each of our instances go here,
     * we've provided one for you to get started
     * The image/sprite for our enemies, this uses
     * a helper we've provided to easily load images
     */
    this.sprite = 'images/enemy-bug.png';
    this.col = -2;
    this.row = 60; 
    /* Random speed between 80 and 300 */  
    this.speed = Math.floor(Math.random() * (300 - 80 + 1)) + 80; 
};

/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers.
     */
    this.col += this.speed * dt;
    /* Restart to populate the enemy once it hits the canvas limit */
    if (this.col >= ctx.canvas.width) {
        this.restart();
    }
    /* Handles collision by comparision of the position of enemy
     * and player. Also considers the width of the enemy (+/- 50)
     */
    if ((player.row === this.row) && 
        (player.col > (this.col - 50)) && 
        (player.col < (this.col + 50))) {
        /* Call to re-populate enemy on canvas */
        player.restart();
    }
};

/* Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);
};

/* Re-populate enemy on the canvas when they run off of it */
Enemy.prototype.restart = function() {  
    /* Off-screen so the body appears gradually */
    this.col = -100;
    /* Pick randomly one of the 3 rows set up for enemy to appear */
    index = Math.floor((Math.random() * 3) + 0);
    this.row = enemyRows[index];
    /* Assign new random speed between 80 and 300 */
    this.speed = Math.floor(Math.random() * (300 - 80 + 1)) + 80;
};

/* Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
 */
var Player = function() {
    this.col = 200;
    this.row = 400;
    this.points = 0;
    this.sprite = 'images/char-cat-girl.png';
};

/* Update the player's position */
Player.prototype.update = function(dt) {
    /* When it moves up after hitting the water block
     * by going off-canvas
     */
    if (this.row <= -50) {
        /* Call to count point and refresh position */
        this.score();
    }
};

/* Draw the player and score number on the screen */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);  
    /* Set up the style for the score data to show and
     * draw the score data on the canvas
     */
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 28px Impact";
    ctx.strokeStyle = "#288E51";
    ctx.lineWidth = 2;
    ctx.fillText(this.points, 450, 631);
    ctx.strokeText(this.points, 450, 631);
};

/* Set up the movements of the player on the screen
 * when the keyes are hit on the keyboard 
 * movements happen when the player is NOT on the limits
 * of the canvas
 */
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'up') {
        if (this.row >= -50) {
            this.row -= 85;
        }
    } 
    else if (keyCode === 'down') { 
        if (this.row < 350) {
            this.row += 85;
        } 
    }
    else if (keyCode === 'right') { 
        if (this.col <= 303) {
            this.col += 101;
        } 
    }
    else if (keyCode === 'left') { 
        if (this.col >= 0) {
            this.col -= 101;
        } 
    }
};

/* Set the player to its initial positon and
 * add 1 point to the score
 */
Player.prototype.score = function() {
    this.col = 200;
    this.row = 400;
    this.points += 1;
};

/* Set the player to its initial positon and
 * set the score to 0
 */
Player.prototype.restart = function() {
    this.col = 200;
    this.row = 400;
    this.points = 0;
};

/* Now instantiate your objects.
 * Place the player object in a variable called player
 */
var player = new Player;
/* Place all enemy objects in an array called allEnemies */
var allEnemies = [];
var enemy;
/* Populate allEnemies array with enemies */
for (var i = 0; i < 4; i++) {
    enemy = new Enemy();
    enemy.col = -103;
    /* Randomly assign a row for the enemy to move on */
    index = Math.floor((Math.random() * 3) + 0);
    enemy.row = enemyRows[index];
    /* Append enemy to the array of enemies */
    allEnemies.push(enemy);
}

/* This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
