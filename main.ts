namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 1 5 5 . . . . . . 
        . . . . . 2 2 1 5 5 . . . . . . 
        . . . . . 2 2 1 5 5 . . . . . . 
        . . . . . 2 2 1 5 5 . . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . 2 2 2 1 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -150)
    projectile.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value = 100
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
    scene.cameraShake(4, 500)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let darts: Image[] = []
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
let enemySpeed = 40
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`Spider`, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
forever(function () {
    if (info.score() == 10) {
        mySprite.sayText("+5 Level-Up Bonus", 2000)
        info.changeScoreBy(5)
        enemySpeed = 70
    }
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
