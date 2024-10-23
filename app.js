var express = require('express');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var http = require('http');

var signup = require('./controllers/signup');

var login = require('./controllers/login')

var app = express();

app.set('view engine', 'ejs');
const server = http.createServer(app);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Correct route setup
app.use('/signup', signup);
app.use('/login', login);
