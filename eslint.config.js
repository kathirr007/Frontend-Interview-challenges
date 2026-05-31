// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: false,
    formatters: true,
    pnpm: true,
  },
  {
    files: ['**/*.md'],
    rules: {
      'markdown/heading-increment': 'off',
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      '.vite',
      'Sr.UI Developer.md',
    ],
  },
)
