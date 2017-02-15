var api = {
	login: function(username, password) {
		let user = {
			username: username,
			password: password
		},
			currentURL = window.location.origin;
		$.post(currentURL + "/login", user, function(data){
			console.log('loggedin')
    	});
	},
	register: function(username, email, password1, password2){
		let user = {
			username: username,
			email: email,
			password1: password1,
			password2: password2
		},
			currentURL = window.location.origin;
		$.post(currentURL + "/register", user, function(data){
			console.log('registered')
    	});
	}
}