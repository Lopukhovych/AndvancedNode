const app = require('./core/app');

global.__basedir = __dirname;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port http://localhost:${PORT}`,);
});
