// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: false,
    formatters: true,
    pnpm: true,
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'no-console': 'off',
      'vue/no-deprecated-delete-set': 'off',
      'vue/custom-event-name-casing': 'off',
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      '.vite',
      '**/*.md',
    ],
  },
)
