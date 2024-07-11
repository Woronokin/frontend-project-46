import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiffFunc.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('gendiff for flat json files', () => {
  const filePath1 = path.resolve(__dirname, '../__fixtures__/file1.json');
  const filePath2 = path.resolve(__dirname, '../__fixtures__/file2.json');

  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const fileData1 = JSON.parse(fs.readFileSync(filePath1, 'utf-8'));
  const fileData2 = JSON.parse(fs.readFileSync(filePath2, 'utf-8'));

  const diff = genDiff(fileData1, fileData2);
  expect(diff).toBe(expectedResult);
});