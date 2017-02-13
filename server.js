var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/assets'));

require('./Node/routes/htmlroutes.js')(app);
require('./Node/routes/apiroutes.js')(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});