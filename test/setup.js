require('../models/Blog');
require('../models/User');


jest.setTimeout(100000);
global.fetch = require("node-fetch");

global.apiUrl = 'http://localhost:3000';

const mongoose = require('mongoose');
const keys = require('../config/keys');


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });


