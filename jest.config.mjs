/** @type {import('jest').Config} */
const config = {
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    watchPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.postgres-data/',
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.postgres-data/',
    ],
    transformIgnorePatterns: ['node_modules/(?!@faker-js)'],
}

export default config
