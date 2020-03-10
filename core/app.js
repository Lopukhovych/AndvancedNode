const express = require('express');

const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('../config/keys');

require('./mongo');

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('../routes/authRoutes')(app);
require('../routes/blogRoutes')(app);

app.get('/example', function (req, res, next) {
	console.log('the response will be sent by the next function ...');
	next();
}, function (req, res) {
	console.log('come_to_second_function: ');
	res.send('Hello from B!');
});


if (['production', 'ci'].includes(process.env.NODE_ENV)) {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

module.exports = app;