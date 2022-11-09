import { beforeEach, expect, test } from "@jest/globals";
import compare from "../bin/compare";
import stringify from "../src/stringify";
import parser from "../src/parser";
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getFixturePath = (file) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return path.resolve(__dirname, '__fixtures__', file);
}

let expected;
let expectedData;

beforeEach(() => {
    const resultPath = getFixturePath('result.yml');
    expected = fs.readFileSync(resultPath, 'utf-8');

    expectedData = [
        { follow: false, proxy: '123.234.53.22', timeout: 50 },
        { host: 'hexlet.io' },
        { timeout: 20, verbose: true },
    ];
});

test('genDiff with JSON', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const file1 = fs.readFileSync(filepath1, 'utf-8');
    const file2 = fs.readFileSync(filepath2, 'utf-8');


    const parsedData = parser(file1, file2, path.extname(filepath1));
    const data = compare(...parsedData);
    const actual = stringify(...data);

    expect(parsedData).toEqual([JSON.parse(file1), JSON.parse(file2)]);
    expect(data).toEqual(expectedData);
    expect(actual).toEqual(expected);
});

test('genDiff with Yaml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    const file1 = fs.readFileSync(filepath1, 'utf-8');
    const file2 = fs.readFileSync(filepath2, 'utf-8');


    const parsedData = parser(file1, file2, path.extname(filepath1));
    const data = compare(...parsedData);
    const actual = stringify(...data);

    expect(parsedData).toEqual([yaml.load(file1), yaml.load(file2)]);
    expect(data).toEqual(expectedData);
    expect(actual).toEqual(expected);
})