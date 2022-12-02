import compare from './src/compare.js';
import fs from 'fs';
import path from 'path';
import parser from "./src/parser.js";
import formatters from "./src/formatters/index.js";

const genDiff = (filepath1, filepath2, format) => {
    const file1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const file2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    const parsedData = parser(file1, file2, path.extname(filepath1), path.extname(filepath2));
    const data = compare(...parsedData);
    return formatters(data, format);
}

export default genDiff;