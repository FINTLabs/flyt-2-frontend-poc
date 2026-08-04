import js from '@eslint/js';
import tslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    {
        ignores: ['build/', '.react-router/', 'node_modules/'],
    },
];
