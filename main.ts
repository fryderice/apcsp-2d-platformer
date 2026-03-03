//Global 

let mySprite = sprites.create(assets.image`umbrella`, SpriteKind.Player)
let currentLevel = 0

//Constants

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
    let username = game.askForString("What's your username?")
    return username;
}

function splashIntro(username: String) {
    game.splash("Hello, " + askForUser() + "!")
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

scene.onOverlapTile(SpriteKind.Player, assets.tile`lava`, function (sprite, location) {
    // Visual feedback
    sprite.startEffect(effects.fire, 200)
    scene.cameraShake(4, 500)
    
    // Consequence: Lose a life and reset position
    info.changeLifeBy(-1)
    
    // Optional: Move player back to start so they don't instantly die again
    //tiles.placeOnRandomTile(sprite, assets.tile`startNode`)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`flag`, function(sprite: Sprite, location: tiles.Location) {
    setNextLevel();
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy(effects.disintegrate)
    info.changeLifeBy(-1)
})

game.onUpdate(function() {
    while (askForUser() == "null" || askForUser() == ""){
        game.askForString("Invalid name.")
    }
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`lava`, function (sprite, location) {
    // Visual feedback
    sprite.startEffect(effects.fire, 200)
    scene.cameraShake(4, 500)
    
    // Consequence: Lose a life and reset position
    info.changeLifeBy(-1)
    
    // Optional: Move player back to start so they don't instantly die again
    //tiles.placeOnRandomTile(sprite, assets.tile`startNode`)
})

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