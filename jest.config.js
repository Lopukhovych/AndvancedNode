const {defaults} = require('jest-config');

//TODO test coverage doesn't work, check when it will be available
// https://jestjs.io/docs/en/puppeteer
// https://github.com/facebook/jest/issues/7962#issuecomment-495272339

// setupTestFrameworkScriptFile has been deprecated in
// favor of setupFilesAfterEnv in jest 24
// setupFilesAfterEnv: ['./jest.setup.js'],
const modulePathIgnorePatterns = process.env.TEST_UNIT ? ['puppeteerTest'] : [];
const coverageDirectory = !process.env.TEST_UNIT ? 'puppeteerTest' : undefined;

module.exports = {
	setupFilesAfterEnv: ['./puppeteerTest/setup.js'],
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	verbose: true,
	testURL: "http://localhost",
	collectCoverage: false,
	preset: "jest-puppeteer",
	modulePathIgnorePatterns,
	coverageDirectory,
};
