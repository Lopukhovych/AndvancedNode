const redisClient = require('../services/redis');

afterAll(() => {
	redisClient.quit();
});

test('start test running', () => {
	console.log('Tests start running: ');
});