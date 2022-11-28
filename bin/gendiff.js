#!/usr/bin/env node
import {program} from "commander";
import compare from '../src/compare.js';
import fs from 'fs';
import path from 'path';
import parser from "../src/parser.js";
import formatters from "../src/formatters/index.js";

const genDiff = (filepath1, filepath2) => {
    const file1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const file2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    const parsedData = parser(file1, file2, path.extname(filepath1));
    const data = compare(...parsedData);
    const options = program.opts();
    const format = options.format;
    console.log(formatters(data, format));
}
program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('filepath1')
    .arguments('filepath2')
    .action(genDiff)
    .option('-f, --format <type>', 'output format', 'stylish')
    .parse();