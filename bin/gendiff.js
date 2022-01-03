#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('filepath1')
  .arguments('filepath2')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(gendiff(filepath1, filepath2, format));
  })
  .option('-f, --format <type>', 'output format', 'stylish')
  .parse();
