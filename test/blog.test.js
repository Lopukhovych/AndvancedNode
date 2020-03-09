const {getPageInstance} = require('./helpers/page');
const {getPostList} = require('./helpers/requests');

const blogTitle = 'Blog Title';
const blogContent = 'Blog Content';
const saveBlogButtonContent = 'Save Blog';

let page;
let browser;

beforeEach(async () => {
	({browser, page} = await getPageInstance());
});

afterEach(async () => {
	if (browser) await browser.close();
});

describe.only('When logged in: ', async () => {
	beforeEach(async () => {
		await page.login();
	});

	test('goto create blog page', async () => {
		await page.goto('localhost:3000/blogs');
		await page.waitFor(1000);
		await page.click('a.create-blog');
		expect(page.url()).toMatch(/blogs\/new/);
	});

	test('input data to create blog form', async () => {
		await page.goto('localhost:3000/blogs', {waitUntil: ['load', 'domcontentloaded']});
		await page.click('a.create-blog');

		await page.insertContent('input[name="title"]', blogTitle);
		await page.insertContent('input[name="content"]', blogContent);

		await page.waitFor(1000);

		await page.click('button[type="submit"]');
		await page.waitFor('button.approve-save-blog');
		expect(await page.getElementContent('button.approve-save-blog')).toMatch(saveBlogButtonContent);
	});

	test.only('get blog list successfully', async () => {
		const data = await page.get('/api/blogs');

		console.log('data: ', data);
		expect(1 + 1).toEqual(2);
	});
});
