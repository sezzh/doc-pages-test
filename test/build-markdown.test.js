/**
 * @fileoverview Test for built-in include feature on markdown files.
 * @author sezzh sezzhltd@gmail.com
 */
const MdWrapper = require('../include-md')

test('Should test markdown file integrity', () => {
  var doc1 = `# test markdown\n\njust a paragraph.\n\n`
  var doc2 =
    `# Docs\n\n# class1\n\nclass1 description\n\n\n# class2\n\nclass2 description\n\n`

  var docs = [doc1, doc2]
  var sourcePath = 'test/src/markdown/extended'
  const mdw = new MdWrapper(sourcePath)
  return expect(mdw.getFiles()).resolves.toEqual(docs)
})
