//Global 

let mySprite = sprites.create(assets.image`umbrella`, SpriteKind.Player)

let level = 0

//Constants

let levels = [tilemap`levelOne`, tilemap`levelTwo`, tilemap`levelThree`]

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

//Main

createMushroom()
info.setLife(3)
controller.moveSprite(mySprite, 100, 0)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 14))
mySprite.ay = 200;
//Global 

let x = "x"
let y = "y"

//Constants

//Functions

function newCheckPoint (posType:string){
    if(posType == "x"){ //this must be manually coded, because for each level, you're gonna have to specify which flag is the checkpoint
        return 0
    }
    else if(posType == "y"){
        return 0 
    }
    else{
        return 0 //this means that you forgot to call the function with an valid argument
    }
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
        mySprite.vy = 0
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

info.onLifeZero(function() {
    mySprite.x = newCheckPoint(x)
    mySprite.y = newCheckPoint(y)
})

//Main

createMushroom()
info.setLife(3)
controller.moveSprite(mySprite, 75, 0)
tiles.setCurrentTilemap(levels[0])
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 12))
mySprite.ay = 200;
scene.setBackgroundColor(9)
let currentLevel = 0;