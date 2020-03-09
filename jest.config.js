const {defaults} = require('jest-config');
// const jest = require('jest');
module.exports = {
	// setupTestFrameworkScriptFile has been deprecated in
	// favor of setupFilesAfterEnv in jest 24
	// setupFilesAfterEnv: ['./jest.setup.js'],
	setupTestFrameworkScriptFile: './test/setup.js',
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	verbose: true,
	testURL: "http://localhost",
};

// jest.setTimeout(1000 * 60 * 10);