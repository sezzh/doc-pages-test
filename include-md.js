/**
 * @fileoverview a module to concat markdowns through markdown-include api.
 * @author sezzh sezzhltd@gmail.com
 * @version 0.1.0
 */
const fs = require('fs')
const path = require('path')
const mdInclude = require('markdown-include')
const swalker = require('s-walker')

function MdWrapper (filesPath) {
  this.filesPath = filesPath
}

MdWrapper.prototype.getFiles = function () {
  return swalker.walk(path.resolve(__dirname, this.filesPath))
    .then(files => {
      var result = []
      files.forEach(file => {
        mdInclude.processFile(file)
      })
      files.forEach(file => {
        result.push(mdInclude.build[file].parsedData)
      })
      console.dir(result)
      return Promise.resolve(result.reverse())
    })
}

module.exports = MdWrapper
