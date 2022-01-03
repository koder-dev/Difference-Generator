import { beforeEach, expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';
import stylish from '../src/formatters/stylish.js';
import parser from '../src/parser.js';
import plain from '../src/formatters/plain.js';

const getFixturePath = (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.resolve(__dirname, '..', '__fixtures__', file);
};

let expected;

beforeEach(() => {
  const resultPath = getFixturePath('result.yml');
  expected = fs.readFileSync(resultPath, 'utf-8');
});

test('genDiff with JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');

  const parsedData = parser(file1, file2, path.extname(filepath1), path.extname(filepath2));
  const data = compare(...parsedData);
  const actual = stylish(data);

  expect(parsedData).toEqual([JSON.parse(file1), JSON.parse(file2)]);
  expect(actual).toEqual(expected);
});

test('genDiff with Yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');

  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');

  const parsedData = parser(file1, file2, path.extname(filepath1), path.extname(filepath2));
  const data = compare(...parsedData);
  const actual = stylish(data);

  expect(parsedData).toEqual([yaml.load(file1), yaml.load(file2)]);
  expect(actual).toEqual(expected);
});

test('genDiff with nested JSON', () => {
  const nestedPath = getFixturePath('nestedResult.txt');
  const nestedPlainPath = getFixturePath('nestedResultPlain.txt');
  expected = fs.readFileSync(nestedPath, 'utf-8');
  const expectedPlain = fs.readFileSync(nestedPlainPath, 'utf-8');

  const filepath1 = getFixturePath('nested1.json');
  const filepath2 = getFixturePath('nested2.json');

  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');

  const parsedData = parser(file1, file2, path.extname(filepath1), path.extname(filepath2));
  const data = compare(...parsedData);
  const actual = stylish(data);
  const actualPlain = plain(data);

  expect(parsedData).toEqual([JSON.parse(file1), JSON.parse(file2)]);
  expect(actual).toEqual(expected);
  expect(actualPlain).toEqual(expectedPlain);
});
