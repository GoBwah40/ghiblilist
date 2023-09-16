// jest.config.js
// module.exports = {
//   preset: 'ts-jest/presets/js-with-babel',
//   testEnvironment: 'jest-environment-jsdom',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
//   moduleNameMapper: {
//     '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['jest', '@testing-library/jest-dom/extend-expect', '@testing-library/react'],
// };
const config = {
  verbose: true,
  preset: 'ts-jest/presets/js-with-babel',
};

module.exports = config;
