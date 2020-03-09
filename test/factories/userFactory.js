const mongoose = require('mongoose');

const User = mongoose.model('User');
const userId = '5e537c6142fd2bced4aaa8ca';
const newUser = async () => {
	return new User({
		// userId,
		// _id: userId,
		// googleId: userId,
		// displayName: "Volod"
	}).save();
};
module.exports = {
	newUser,
};