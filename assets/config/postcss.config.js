const fs = require('fs')

const path = require('path')

const wd = __dirname
const assetsDir = path.join(wd, '..')

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './themes/pico/layouts/**/*.html',
    './layouts/**/*.html'
  ],

  // This is the function used to extract class names from your templates
  defaultExtractor: content => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>\"'`\s]*[^<>\"'`\s]/g) || []

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>\"'`\s.()]*[^<>\"'`\s.()]/g) || []

    return broadMatches.concat(innerMatches)
  }
})

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [assetsDir]
    }),
    require('tailwindcss')(path.join(wd, 'tailwind.config.js')),
    require('autoprefixer')(),
    ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
  ]
}
