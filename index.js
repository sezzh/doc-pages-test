const path = require('path')
const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const packagejson = require('metalsmith-packagejson')
const permalinks = require('metalsmith-permalinks')
const Handlebars = require('handlebars')
const navs = require('metalsmith-navigation')

// relative path helper
var relativePathHelper = (current, target) => {
  // normalize and remove starting slashes from path
  if (!current || !target) {
    return ''
  }
  current = path.normalize(current).slice(0)
  target = path.normalize(target).slice(0)
  current = path.dirname(current)
  return path.relative(current, target).replace(/\\/g, '/')
}

Handlebars.registerHelper('relative_path', relativePathHelper)

// navigation configuration
var navConfigs = {
  primary: {
    sortBy: 'nav_sort',
    filterProperty: 'nav_groups'
  }
}

var navSettings = {
  navListProperty: 'navs'
}

// Metalsmith example

Metalsmith(__dirname) //instantiate Metalsmith in the cwd.
  .source(path.resolve(__dirname, 'src', 'markdown')) // source directory
  .destination(path.resolve(__dirname, 'docs')) // destination directory
  .metadata({
    author: 'sezzh'
  })
  .use(packagejson())
  .use(markdown(
  ))
  .use(navs(navConfigs, navSettings))
  .use(layouts({
    engine: 'handlebars',
    directory: path.resolve(__dirname, 'layouts'),
    partials: path.resolve(__dirname, 'partials')
  }))
  .use(assets({
    source: './src/css',
    destination: './css'
  }))
  .build((err) => {
    if (err) throw err
  })
