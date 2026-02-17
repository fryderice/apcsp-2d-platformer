 let mySprite = sprites.create(img`
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 f f 3 3 3 3
     3 3 3 f f 3 3 3 3 3 f f 3 3 3 3
     3 3 3 f f 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 f 3 3 3 3 3 3 3 3 3 f 3 3 3
     3 3 f f 3 3 3 3 3 3 f f f 3 3 3
     3 3 3 f f f f f f f f 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
     3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
 `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 14))
mySprite.ay = 200;

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

