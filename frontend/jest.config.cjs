module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.node.json' }],
  },
}
