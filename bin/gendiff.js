#!/usr/bin/env node
import {program} from "commander";
import compare from './compare.js';

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('filepath1')
    .arguments('filepath2')
    .action(compare)
    .option('-f, --format <type>', 'output format')
    .parse();