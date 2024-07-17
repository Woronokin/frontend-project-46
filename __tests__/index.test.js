import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const fileFormats = ['json', 'yaml', 'yml'];
const outputFormats = ['stylish', 'plain', 'json'];

describe('genDiff testing', () => {
  test.each(fileFormats)('genDiff testing with two %p-files', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    outputFormats.forEach((outputFormat) => {
      const expectedResult = readFixture(`${outputFormat}TestResult.txt`);
      const actualResult = genDiff(filepath1, filepath2, outputFormat).trim();
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
