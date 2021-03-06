var username, password, text;
var message = ['Climb the tower if you seek glory', 'Climb the tower if you seek power',
    'Climb the tower if you seek riches', 'The tower awaits your destiny'];

var music, musicplay=true;

//Var for snow
var max = 0,
    back_emitter,
    update_interval = 4 * 60,
    i = 0;

var MainMenuState = {
    create: function() {
        game.add.sprite(0, 0, 'backgroundMain');
        game.add.sprite((game.world.width-650), 10, 'title');
        username = game.add.inputField(game.world.width-500, game.world.height-400, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 200,
            max: 20,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Username'
        });
        username.blockInput = false;
        password = game.add.inputField(game.world.width-500, game.world.height-320, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 200,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Password',
            type: PhaserInput.InputType.password
        });
        password.blockInput = false;
        var style = { font: "bold 22px Arial", fill: "#749694", boundsAlignH: "center", boundsAlignV: "middle"};
        text = game.add.text(0, 0, message[Math.floor(Math.random() * message.length)], style);
        text.stroke = "#000";
        text.strokeThickness = 3;
        text.setTextBounds(0, 80, 800, 100);
        game.add.button(game.world.width-480, game.world.height-240,
            'button-start', this.startGame);
        game.add.button(game.world.width-460, game.world.height-100,
            'button_register', this.Registration);
        game.add.button(game.world.width-491, game.world.height-170,
            'button_leaderboard', this.Leaderboard);

    //Makes it snow 
    back_emitter = game.add.emitter(game.world.centerX, -32, 600);
    back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    back_emitter.maxParticleScale = 0.9;
    back_emitter.minParticleScale = 0.2;
    back_emitter.setYSpeed(20, 100);
    back_emitter.gravity = 0;
    back_emitter.width = game.world.width * 1.5;
    back_emitter.minRotation = 10;
    back_emitter.maxRotation = 80;
    back_emitter.start(false, 14000, 20);

    //Music
    if (musicplay) {
        music = game.add.audio('music');
        music.play('',0,.25,true);
        musicplay = false;
    }
    
    },
    startGame: function() {
        api.login(username.value, password.value, function(status, msg) {
            if (status == true) { game.state.start('levelOne'); }
            else {
                text.setText(msg);
                password.resetText();
            }
        });
    },
    Registration: function() {
        game.state.start('Registration');
    },
    Leaderboard: function() {
        game.state.start('Leaderboard');
    },
    end: function() {
        game.state.start('levelOne');
    }
}