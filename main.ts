//Global 

let mySprite = sprites.create(assets.image`umbrella`, SpriteKind.Player)
let currentLevel = 0

//Constants

//array of tilemaps
const levels = [tilemap`levelOne`, tilemap`levelTwo`, tilemap`levelThree`]

//Functions

function createMushroom (){
    let mushroom = sprites.create(assets.image`mushroom`,SpriteKind.Enemy)
    mushroom.ay = 200
    mushroom.vx = 0
}

function setNextLevel (){
    currentLevel++;
    tiles.setCurrentTilemap(levels[currentLevel]);
    tiles.placeOnRandomTile(mySprite, assets.tile`spawnPoint`)
}

function askForUser() {
    //function with a return
    let username = game.askForString("What's your username?")
    while (username == "null" || username == "") {
        username = game.askForString("Invalid name.")
    }
    return username;
}

//function with a parameter
function splashIntro(username: String) {
    game.splash("Hello, " + username + "!")
    game.splash("Jump using the up button!")
    game.splash("While holding down up, hold A to float!")
    game.splash("Reach the flag to win!")
}

function ifWin(player: Sprite) {
    
}

//Event Handlers

scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    // If the mushroom hits the floor (bottom collision)
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        // If it isn't moving yet, start sprinting right
        //Some of our conditionals
        if (sprite.vx == 0) {
            sprite.vx = -60
        }
    }

    if (sprite.isHittingTile(CollisionDirection.Left)) {
        sprite.destroy(effects.disintegrate)
    }
})

// player jumps with up (W on keyboard), and floats with A (space on keyboard)
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -125
    }
})

controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    if (!(mySprite.isHittingTile(CollisionDirection.Bottom)) && controller.A.isPressed()) {
        mySprite.vy = 0;
    }
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`flag`, function(sprite: Sprite, location: tiles.Location) {
    setNextLevel();
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy(effects.disintegrate)
    info.changeLifeBy(-1)
})

/*game.onUpdate(function() {
    //while loop & user input here
    while (askForUser() == "null" || askForUser() == ""){
        game.askForString("Invalid name.")
    }
})*/

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy(effects.disintegrate)
    info.changeLifeBy(-1)
})

//Main

splashIntro(askForUser());
createMushroom()
info.setLife(3)
controller.moveSprite(mySprite, 75, 0)
tiles.setCurrentTilemap(levels[0])
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 12))
mySprite.ay = 200;
scene.setBackgroundColor(9)
scene.setBackgroundColor(9)