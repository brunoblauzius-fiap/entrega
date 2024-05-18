export default {
  preset: 'ts-jest', // Define o preset para TypeScript
  testEnvironment: 'node', // Define o ambiente de teste (Node.js)
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$', // Padrão para encontrar arquivos de teste
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensões de arquivos a serem consideradas
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforma arquivos TypeScript
  },
  testPathIgnorePatterns: [
    '/tests/mockDatabase/MockDataBase.ts',
    '/src/tests/mockDatabase/MockDataBase.js',
    '/tests/mockDatabase/MockDataBaseNull.ts',
    '/src/tests/mockDatabase/MockDataBaseNull.js',
    '/tests/mockDatabase/mockPedidoServiceOK.ts',
    '/src/tests/mockDatabase/mockPedidoServiceOK.js'
  ],
  coveragePathIgnorePatterns : [
    // '/src/'
    '/tests/mockDatabase/MockDataBase.ts',
    '/src/tests/mockDatabase/MockDataBase.js'
  ],
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  testTimeout: 120000,
  verbose: true,
  // detectOpenHandles: true,
  collectCoverage: true,
  // forceExit: true,
  transformIgnorePatterns: ['./node_modules'],
  setupFiles: ['dotenv/config'],
};