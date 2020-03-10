const mongoose = require('mongoose');
const keys = require('../config/keys');

const userSchema = require('../models/User');
const blogSchema = require('../models/Blog');

mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);

require('../services/passport');
require('../services/cache');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {useMongoClient: true});