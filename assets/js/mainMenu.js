var username, password, text;
var message = ['Climb the tower if you seek glory', 'Climb the tower if you seek power',
    'Climb the tower if you seek riches', 'Climb the tower and become a god'];
var MainMenuState = {
    create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.world.width-650), 10, 'title');
        username = game.add.inputField(game.world.width-500, game.world.height-360, {
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
        password = game.add.inputField(game.world.width-500, game.world.height-280, {
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
        var style = { font: "bold 22px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
        text = game.add.text(0, 0, message[Math.floor(Math.random() * message.length)], style);
        text.setShadow(1, 1, 'rgba(0,0,0,1)', 3);
        text.setTextBounds(0, 80, 800, 100);
        game.add.button(game.world.width-480, game.world.height-180,
            'button-start', this.startGame);
        game.add.button(game.world.width-460, game.world.height-140,
            'button_register', this.Registration);
        game.add.button(0, 0,
            'button_quit', this.end);
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
    end: function() {
        game.state.start('End')
    }
}