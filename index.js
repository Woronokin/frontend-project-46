import fs from 'fs';
import path from 'path';
import parseFile from './src/parsers.js';
import makeTree from './src/makeTree.js';
import renderInFormat from './src/formatters/index.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1).trim();

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const parsedData1 = parseFile(data1, getFormat(file1));
  const parsedData2 = parseFile(data2, getFormat(file2));
  const diffTree = makeTree(parsedData1, parsedData2);

  return renderInFormat(diffTree, format);
};

export default genDiff;
