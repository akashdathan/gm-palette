import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/?(*.)+(spec|test).+(ts)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};

export default config;
