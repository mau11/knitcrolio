import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@auth$": "<rootDir>/auth.ts",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@custom-types/(.*)$": "<rootDir>/src/types/$1",
    "^@form/(.*)$": "<rootDir>/src/components/form/$1",
    "^@icons/(.*)$": "<rootDir>/src/components/icons/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@prisma/(.*)$": "<rootDir>/src/generated/prisma/$1",
    "^@schemas/(.*)$": "<rootDir>/src/lib/schemas/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  verbose: true,
};

export default config;
