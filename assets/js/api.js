var api = {
	login: function(username, password, cb) {
		let user = {
			username: username,
			password: password
		},
			currentURL = window.location.origin;
		$.post(currentURL + "/login", user, function(data){
			if (data == 'Login Successful') {
				cb(true, data);
			}
			else {
				cb(false, data);
			}
    	});
	},
	register: function(username, email, password1, password2, cb){
		let user = {
			username: username,
			email: email,
			password1: password1,
			password2: password2
		},
			currentURL = window.location.origin;
		$.post(currentURL + "/register", user, function(data){
			if (data == 'Signup successful') {
				cb(true, data);
			}
			else {
				cb(false, data);
			}
    	});
	}
}