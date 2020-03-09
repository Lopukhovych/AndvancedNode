const mongoose = require('mongoose');
const redis = require("redis");
const util = require('util');
const keys = require('../config/keys');


const redisClient = redis.createClient(keys.redisURI);
const exec = mongoose.Query.prototype.exec;

redisClient.hget = util.promisify(redisClient.hget);
redisClient.get = util.promisify(redisClient.get);

mongoose.Query.prototype.cache = async function (options = {}) {
	this._useCache = true;
	this._hashKey = JSON.stringify(options.key || '');

	return this;
};

mongoose.Query.prototype.exec = async function () {
	console.log('I\'M ABOUT TO RUN A QUERY');
	if (!this._useCache) {
		return exec.apply(this, arguments);
	}
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name
		}));
	const cacheValue = await redisClient.hget(this._hashKey, key);
	if (cacheValue) {
		console.log('take_from_cache: : ', key );
		const doc = JSON.parse(cacheValue);
		return Array.isArray(doc)
			? doc.map(d => new this.model(d))
			: new this.model(doc);
	}
	console.log('take_from_db: ', key );
	const result = await exec.apply(this, arguments);
	redisClient.hset(this._hashKey, key, JSON.stringify(result));
	// redisClient.expire(this._hashKey, 10);
	return result;
};

async function clearHash(key) {
	console.log('delete_cache with key: ', key);
	redisClient.del(JSON.stringify(key));
}

module.exports = {
	clearHash,
};