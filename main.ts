//Global 

let mySprite = sprites.create(img`
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 f f 2 2 2 2
     2 2 2 f f 2 2 2 2 2 f f 2 2 2 2
     2 2 2 f f 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 f 2 2 2 2 2 2 2 2 2 f 2 2 2
     2 2 f f 2 2 2 2 2 2 f f f 2 2 2
     2 2 2 f f f f f f f f 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
 `, SpriteKind.Player)

//Constants

//Functions

function createMushroom (){
    let mushroom = sprites.create(assets.image`mushroom`,SpriteKind.Enemy)
    mushroom.ay = 200
    mushroom.vx = 0
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

// lets player jump with either the A button or up button
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy += -125;
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy += -125;
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

//Main

createMushroom()
info.setLife(3)
controller.moveSprite(mySprite, 100, 0)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 14))
mySprite.ay = 200;
