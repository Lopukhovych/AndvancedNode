const fetch = require("node-fetch");

async function createBlog(page) {
	return page.evaluate(async () => {
			return fetch(`${apiUrl}/api/blogs`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: 'Blog Title',
					content: 'Blog content'
				})
			})
				.then(data => data.json());
		}
	)
}

async function getPostList(page) {
	return page.evaluate(async () => {
		return fetch(`/api/blogs`, {
			method: 'Get',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(data => data.json());
	});
}


module.exports = {createBlog, getPostList};