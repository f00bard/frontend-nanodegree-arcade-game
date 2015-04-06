// Enemies our player must avoid
var Enemy = function(num) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //
    this.num = num;

    // Initialize enemy
    this.reset();

    // Debug stuff
    //console.log("Enemy " + num + " created at row " + this.row);
};

// Initialize enemy position/speed. This function called when
// enemy is created as well as when it leaves the play area.
Enemy.prototype.reset = function() {
    // Initialize bug at a random row
    this.row = Math.floor(Math.random() * 3) + 1;

    // Background tiles are on a vertical grid of 84px, offset sprite by
    // constant amount to render it properly.  Offset sprite to
    // left side of canvas (all images are 101 px wide).
    this.x = 0 - 101;
    this.y = (this.row * 83) - 20;

    // Enemy movement speed (pixels per second)
    this.speed = Math.floor(Math.random() * 300) + 75;

    // Debug output
    console.log("Enemy ("+this.num+"): Row "+this.row+", Speed "+this.speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Debug output (chatty!)
    // console.log("Enemy " + this.num + ": ("+this.x+","+this.y+")")

    // Speed is in pixels per second, so increase x by speed times
    // fraction of a sec since last tick (dt)
    this.x += (Math.floor(this.speed * dt));

    // Check if we left the play area
    if (this.x > ctx.canvas.width) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // Initialize player position
    this.reset();
};
Player.prototype.reset = function() {
    // Initialize player at center bottom of screen
    this.row = 5;
    this.col = 2;
};
Player.prototype.update = function(dt) {
    // Transform column/row into pixels
    this.x = this.col * 101;
    this.y = (this.row * 83) - 35;
};

Player.prototype.render = function() {
    // Render image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'left':
            if (this.col > 0)
                this.col -= 1;
        break;
        case 'up':
            if (this.row > 0)
                this.row -= 1;
        break;
        case 'right':
            if (this.col < 4)
                this.col += 1;
        break;
        case 'down':
            if (this.row < 5)
                this.row += 1;
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numEnemies = 4;
for (i=0; i < numEnemies; i++) {
    allEnemies.push(new Enemy(i));
}
var player = new Player();


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
