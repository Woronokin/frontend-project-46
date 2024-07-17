import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import makeTree from './makeTree.js';
import renderInFormat from './formatters/index.js';

const getData = (filepath) => ({
  content: fs.readFileSync(path.resolve(filepath)),
  type: path.extname(filepath).slice(1).trim(),
});

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const parsedData1 = parseFile(data1);
  const parsedData2 = parseFile(data2);
  const diffTree = makeTree(parsedData1, parsedData2);
  return renderInFormat(diffTree, format);
};

export default genDiff;
