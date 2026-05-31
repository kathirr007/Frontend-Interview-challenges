// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: false,
    formatters: true,
    pnpm: true,
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
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
