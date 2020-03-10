const redis  = require("redis");
const util = require('util');
const keys = require('../config/keys');


const redisClient = redis.createClient(keys.redisURI);

redisClient.hget = util.promisify(redisClient.hget);
redisClient.get = util.promisify(redisClient.get);


module.exports = redisClient;
