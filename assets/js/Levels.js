var Levels = {
	createLedge(ledge, platforms) {
		let x1 = Math.floor((Math.random() * 600) + 100);
		ledge[0] = platforms.create(x1, 460, 'ground');
	    ledge[1] = platforms.create(400, 460, 'ground');
        ledge[2] = platforms.create(Math.floor((Math.random() * 20) + 250), 420, 'ground');
        ledge[3] = platforms.create(100, 350, 'ground');
        ledge[4] = platforms.create(280, 300, 'ground');
        ledge[5] = platforms.create(420, 250, 'ground');
        ledge[6] = platforms.create(150, 200, 'ground');
        ledge[7] = platforms.create(10, 250, 'ground');
        ledge[8] = platforms.create(600, 250, 'ground5');
        for (let i=0; i<ledge.length; i++) {
        	ledge[i].body.immovable = true;
        }
	},

}