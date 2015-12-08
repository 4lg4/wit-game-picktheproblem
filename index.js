
var game = new Phaser.Game(736, 384, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    resize: resize,
    render: render
});


var emitter;
var bmd;
var text;
var music;

var totals = {
    callKill: 0,
    call: 0
};

var calls = [];

function preload() {

    game.load.image('sky', 'assets/skies/command.jpg');
    //game.load.image('sky', 'assets/skies/command2.png');
    game.load.image('phone', 'assets/misc/phone_64.png');
    game.load.image('phoneStatus', 'assets/misc/phone_24.png');
    game.load.image('muteStatus', 'assets/misc/mute.png');
    game.load.image('unmuteStatus', 'assets/misc/unmute.png');
    //game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);


    game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);


}

function create() {
    console.log('create');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    music = game.sound.play('boden');

    game.add.image(20,10, 'phoneStatus');
    var bg = game.add.image(0, 40, 'sky');
    //bg.scale.setTo(game.world.width, game.world.height - 30);


    var unmuteIcon = game.add.image(game.world.width - 30,10, 'unmuteStatus');
    var muteIcon = game.add.image(game.world.width - 60,10, 'muteStatus');

    unmuteIcon.inputEnabled = true;
    unmuteIcon.events.onInputDown.add(unmute, this);
    muteIcon.inputEnabled = true;
    muteIcon.events.onInputDown.add(mute, this);

    //game.input.onDown.add(click,this);

    //emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    //
    //emitter.makeParticles('veggies', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 200, true, true);
    //
    //emitter.minParticleSpeed.setTo(-200, -300);
    //emitter.maxParticleSpeed.setTo(200, -400);
    //emitter.gravity = 150;
    //emitter.bounce.setTo(0.5, 0.5);
    //emitter.angularDrag = 30;
    //
    //emitter.start(false, 8000, 400);

    setInterval(createCall,2000);
    setInterval(callNotCaughtDestroy,4000);



    //	This is the BitmapData we're going to be drawing to
    //bmd = game.add.bitmapData(game.width, game.height);
    //
    ////	Black and opaque
    //bmd.fill(0, 0, 0, 1);
    //
    //bmd.addToWorld();
    //
    ////	Our text object
    //text = game.make.text(0, 0, "phaser", { font: "bold 32px Arial", fill: "#ff0044" });
    //text.anchor.set(0.5);
    //
    //game.add.tween(text.scale).to( { x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
    //
    ////	Uncomment for a pretty sweet effect :)
    //game.time.events.loop(Phaser.Timer.SECOND * 4, function() { bmd.cls(); }, this);


}

// cria itens a cada 2s
function createCall() {
    var tempSprite = game.add.sprite(game.world.randomX, (game.world.randomY > 150) ? game.world.randomY - 50 : game.world.randomY, 'phone');
    tempSprite.inputEnabled = true;
    tempSprite.events.onInputDown.add(kill, this);

    game.physics.enable(tempSprite, Phaser.Physics.ARCADE);
    tempSprite.body.velocity.setTo(200, 200);
    tempSprite.body.collideWorldBounds = true;
    tempSprite.body.bounce.set(0.8);
    tempSprite.body.gravity.set(0, 180);
    totals.call += 1;

    calls.push({
        id: totals.call,
        //date: new moment(),  // se precisar usar data para controlar quem deve ser deletado
        item: tempSprite
    });
}

// destroy itens nao pegos a cada 4s
function callNotCaughtDestroy(){
    _.each(calls, function(c,k){
        if(c !== undefined && c.id < totals.call-2) {
            c.item.destroy();
            calls.splice(k,1);
        }
    });
}

function mute(){
    console.log('mute');
    music.stop();
}
function unmute(){
    console.log('unmute');
    music.play();
}

function kill(item){
    //alert('click kill');
    item.destroy();
    totals.callKill += 1;
}

function update() {
    //console.log(new Date().toJSON() + ' update ');
    //game.physics.arcade.collide(emitter);


    //bmd.fill(0, 0, 0, 0.05);

    //	Un-comment to see the rotation in action
    //text.rotation += 0.05;

    //bmd.draw(text, game.world.randomX, game.world.randomY, null, null, 'destination-out');
}

function click(a){
    console.log(a);
    //alert('click');
}

function resize(){
    console.log('resize');

    // this function is called each time the browser is resized, and re-positions
    // game elements to keep them in their right position according to game size
    levelText.x = Math.round((game.width-levelText.width)/2);
    levelText.y = game.height;
    titleText.x = Math.round((game.width-titleText.width)/2);
    fixedGroup.x = Math.round((game.width-320)/2);
    fixedGroup.y = Math.round((game.height-320)/2);
    movingGroup.x = Math.round((game.width-320)/2);
    movingGroup.y = Math.round((game.height-320)/2);
}

function render() {

    // Input debug info
    //game.debug.inputInfo(32, 32);
    ////game.debug.spriteInputInfo(sprite, 32, 130);
    //game.debug.pointer( game.input.activePointer );
    //
    //
    //game.debug.soundInfo(music, 32, 32);
    //
    //if (music.isDecoding)
    //{
    //    game.debug.text("Decoding MP3 ...", 32, 200);
    //}

}
