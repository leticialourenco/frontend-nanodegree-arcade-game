// Helper variables

// Rows where enemies can be generated + variable helper used
// to select the position in the array
var enemyRows = [60, 145, 230];
var index;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.col = -2;
    this.row = 60; 
    // Random speed between 80 and 300   
    this.speed = Math.floor(Math.random() * (300 - 80 + 1)) + 80; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.col += this.speed * dt;
    // Restart to populate the enemy once it hits the canvas limit
    if (this.col >= ctx.canvas.width) {
        this.restart();
    }
    // Handles collision by comparision of the position of enemy
    // and player. Also considers the width of the enemy (+/- 50)
    if ((player.row == this.row) && 
        (player.col > (this.col - 50)) && 
        (player.col < (this.col + 50))) {
        // Call to re-populate enemy on canvas
        player.restart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);
};

// Re-populate enemy on the canvas when they run off of it
Enemy.prototype.restart = function() {  
    // Off-screen so the body appears gradually
    this.col = -100;
    // Pick randomly one of the 3 rows set up for enemy to appear
    index = Math.floor((Math.random() * 3) + 0);
    enemy.row = enemyRows[index];
    // Assign new random speed between 80 and 300
    this.speed = Math.floor(Math.random() * (300 - 80 + 1)) + 80;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
