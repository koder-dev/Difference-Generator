import { expect, test } from "@jest/globals";
import compare from "../bin/compare";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
test('General functions genDiff', () => {
    const resultpath = path.resolve(__dirname, '__fixtures__', 'result.yml');
    const filepath1 = path.resolve(__dirname, '__fixtures__', 'file1.json');
    const filepath2 = path.resolve(__dirname, '__fixtures__', 'file2.json');
    const expected = fs.readFileSync(resultpath, 'utf-8').toString();
    expect(compare(filepath1, filepath2)).toEqual(expected);
    expect(compare('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json')).toEqual(expected);
});