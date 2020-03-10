const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');

const keys = require('../../config/keys');


const keygrip = Keygrip([keys.cookieKey]);

const getSession = async (user) => {
	const sessionObj = {
		passport: {
			user: user._id.toString()
		}
	};
	const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64');
	const signature = keygrip.sign('session=' + session);
	return {
		session, signature
	}
};

module.exports = {
	getSession
};