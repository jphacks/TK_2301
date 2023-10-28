module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    '@react-native-community',
    'prettier/@typescript-eslint',
  ],
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['2', 'never'],
    'react/jsx-filename-extendsion': [1, {extensions: ['.ts', '.tsx']}],
    'no-use-before-define': [
      'error',
      {functions: false, classes: true, variables: false},
    ],
  },
};
