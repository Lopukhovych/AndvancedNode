const puppeteer = require('puppeteer');

const {getSession} = require('../factories/sessionFactory');
const {newUser} = require('../factories/userFactory');

async function getPageInstance(path) {
	const {host, localPath} = path || {};
	const pagePath = host || 'http://localhost:3000/';
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			'--single-process',
			'--no-sandbox'
		],
	});

	const page = await browser.newPage();

	Reflect.set(page, 'login', async () => {
		const user = await newUser();
		const {session, signature} = await getSession(user);
		await page.setCookie(
			{name: 'session', value: session, domain: 'localhost'},
			{name: 'session.sig', value: signature, domain: 'localhost'}
		);
		await page.goto(pagePath + '' || localPath);
	});

	Reflect.set(page, 'getElementLink', async (selector) => page.$eval(selector, el => el.href));
	Reflect.set(page, 'getElementContent', async (selector) => page.$eval(selector, el => el.innerHTML));
	Reflect.set(page, 'insertContent', async (selector, content) => {
		await page.waitForSelector(selector);
		await page.type(selector, content);
	});


	Reflect.set(page, 'get', async (path) => page.evaluate(async (path) => {
		return fetch(path, {
			method: 'Get',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(data => data.json());
	}, path));

	Reflect.set(page, 'post', async (path, body) => page.evaluate(async (path, body) => {
			return fetch(path, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
				.then(data => data.json());
		}, path, body
	));

	return {browser, page};
}


module.exports = {
	getPageInstance,
};