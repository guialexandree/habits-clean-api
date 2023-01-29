module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!<rootDir>/src/main/**',
		'!<rootDir>/src/**/*protocols.ts',
		'!<rootDir>/src/**/*protocols/index.ts',
		'!<rootDir>/src/**/index.ts'
	],
	coverageDirectory: 'coverage',
	watchPathIgnorePatterns: ['globalConfig'],
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1'
	}
}