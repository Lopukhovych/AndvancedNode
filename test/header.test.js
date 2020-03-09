// const puppeteer = require('puppeteer');
// const Buffer = require('safe-buffer').Buffer;
// const Keygrip = require('keygrip');
// const {getSession} = require('./factories/sessionFactory');
// const userFactory = require('./factories/userFactory');
const {getPageInstance} = require('./helpers/page');



const HeaderText = 'Blogster';
let page;
let browser;

beforeEach(async () => {
	({browser, page} = await getPageInstance());
});

afterEach(async() => {
	if (browser) await browser.close();
});

test('The header has correct text', async () => {
	await page.goto('http://localhost:3000');
	const text = await page.getElementContent('a.brand-logo');
	console.log('text: ', text);
	expect(text).toEqual(HeaderText);
});

test("Start oauth 0 process",async () => {
	await page.goto('http://localhost:3000');
	await page.click('.right a');
	const googleAuthUrl = await page.url();
	expect(googleAuthUrl).toMatch(/accounts\.google\.com/);
});

test('Show login button when user logged in', async () => {
	await page.login();

	await page.waitFor('a[href="/auth/logout"]');
	const logoutLink = await page.getElementLink('a.logout');
	const blogsLink = await page.getElementLink('a.blogs');
	expect(logoutLink).toMatch(/auth\/logout/);
	expect(blogsLink).toMatch(/blogs/);
});

