const mongoose = require('mongoose');
const keys = require('../config/keys');

const blogSchema = require('../models/Blog');
const userSchema = require('../models/User');


jest.setTimeout(100000);
global.fetch = require("node-fetch");

global.apiUrl = 'http://localhost:3000';

mongoose.Promise = global.Promise;

mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);

mongoose.connect(keys.mongoURI, {useMongoClient: true});


