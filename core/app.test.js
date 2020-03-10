const request = require("supertest");
const mongoose = require('mongoose');
const app = require("./app");
const redisClient = require('../services/redis');

afterAll(async (done) => {
	mongoose.disconnect(done);
	redisClient.quit();
	done()
});

describe("Test the root path", () => {
	test("It should response the GET method", async done => {
		if (['dev', 'test'].includes(process.env.NODE_ENV) ) {
			const response = await request(app).get("/");
			expect(response.statusCode).toBe(404);
		} else {
			const response = await request(app).get("/");
			expect(response.statusCode).toBe(200);
		}
		done();
	});
});