var username, email, password1, password2, text;

var max = 0,
    back_emitter,
    update_interval = 4 * 60,
    i = 0;

var RegistrationState = {
	create: function() {
        game.add.sprite(0, 0, 'backgroundMain');
        game.add.sprite((game.world.width-650), 10, 'title');
        username = game.add.inputField(game.world.width-500, game.world.height-450, {
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
        email = game.add.inputField(game.world.width-500, game.world.height-370, {
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
        password1 = game.add.inputField(game.world.width-500, game.world.height-290, {
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
        password2 = game.add.inputField(game.world.width-500, game.world.height-210, {
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
        var style = { font: "bold 22px Arial", fill: "#749694", boundsAlignH: "center", boundsAlignV: "middle"};
        text = game.add.text(0, 0, 'Username must be 5 characters. Password must be 8 characters long.', style);
        text.stroke = "#000";
        text.strokeThickness = 3;
        text.setTextBounds(0, 80, 800, 100);
        game.add.button(game.world.width-460, game.world.height-140,
            'button_submit', this.Submit);
        game.add.button(game.world.width-445, game.world.height-80,
            'button_back', this.Back);

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
    
    },
    Submit: function() {
    	api.register(username.value, email.value, password1.value, password2.value, function(status, msg) {
    		if (status == true) {
    			game.state.start('MainMenu');
    		}
    		else {
    			text.setText(msg);
		    	password1.resetText();
		    	password2.resetText();
    		}
    	});   	
    },
    Back: function() {
    	game.state.start('MainMenu');
    }
}