const {clearHash} = require('../services/cache');

module.exports = async (req, res, next) => {
	console.log('run before next clearHash:');
	await next();
	console.log('run after next clearHash:');
	clearHash(req.user.id);
	console.log('run after clearHash:');
};