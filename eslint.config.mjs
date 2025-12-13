import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
    ],
  }),
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'artifacts/**',
      'cache/**',
      '*.cjs',
      'scripts/**',
      'deploy-*.js',
      'deploy-*.mjs',
      'test-*.js',
      'verify-*.js',
      'generate-*.js',
      'hardhat.config.cjs',
    ],
  },
];

export default eslintConfig;