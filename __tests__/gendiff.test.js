import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiffFunc.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff for flat json files', () => {
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const fileData1 = JSON.parse(readFile('file1.json'));
  const fileData2 = JSON.parse(readFile('file2.json'));

  const diff = genDiff(fileData1, fileData2);
  expect(diff).toBe(expectedResult);
});

test('gendiff for flat yaml files', () => {
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const fileData1 = yaml.load(readFile('file1.yaml'));
  const fileData2 = yaml.load(readFile('file2.yaml'));

  const diff = genDiff(fileData1, fileData2);
  expect(diff).toBe(expectedResult);
});