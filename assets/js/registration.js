var username, email, password1, password2;
var RegistrationState = {
	create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.world.width-650), 10, 'title');
        username = game.add.inputField(game.world.width-500, game.world.height-460, {
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
        email = game.add.inputField(game.world.width-500, game.world.height-380, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 200,
            max: 20,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Email'
        });
        password1 = game.add.inputField(game.world.width-500, game.world.height-300, {
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
        password2 = game.add.inputField(game.world.width-500, game.world.height-220, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 200,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Confirm Password',
            type: PhaserInput.InputType.password
        });
        game.add.button(game.world.width-460, game.world.height-140,
            'button_submit', this.Submit);
        game.add.button(game.world.width-460, game.world.height-80,
            'button_back', this.Back);
    },
    Submit: function() {
    	api.register(username.value, email.value, password1.value, password2.value);
    	username.resetText();
    	email.resetText();
    	password1.resetText();
    	password2.resetText();
    },
    Back: function() {
    	game.state.start('MainMenu');
    }
}