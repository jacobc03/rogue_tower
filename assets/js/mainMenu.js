var username, password;
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
        game.add.button(game.world.width-480, game.world.height-180,
            'button-start', this.startGame);
        game.add.button(game.world.width-460, game.world.height-100,
            'button_register', this.Registration);
        game.add.button(game.world.width-460, game.world.height-480,
            'button_quit', this.end);
    },
    startGame: function() {
        //api.login(username.value, password.value);
        //password.resetText();
        game.state.start('levelOne');
    },
    Registration: function() {
        game.state.start('Registration');
    },
    end: function() {
        game.state.start('End')
    }
}