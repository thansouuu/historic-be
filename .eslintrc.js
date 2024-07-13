export default {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: 'standard',
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['warn', 4],
        'space-before-function-paren': 'off',
        'comman-dangle': [2, 'always-multiline'],
        semi: 'always',
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
                argsIgnorePattern: '^_.*?$',
            },
        ],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'no-console': 'warn',
        'no-return-await': 'warn',
        'no-useless-return': 'warn',
        'no-var': 'warn',
        'no-void': 'warn',
        'prefer-const': 'warn',
        'prefer-destructuring': 'warn',
        'require-await': 'warn',
        'func-names': 'warn',
        'no-underscore-danger': 'warn',
        'consistent-return': 'warn',
    },
};
