#!/usr/bin/env node
import {program} from "commander";
import fs from "fs";
import path from "path";
import _ from "lodash";

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('filepath1')
    .arguments('filepath2')
    .action((filepath1, filepath2) => {
        const path1 = path.resolve(process.cwd(), filepath1);
        const path2 = path.resolve(process.cwd(), filepath2);
        const data1 = fs.readFileSync(path1, 'utf-8');
        const data2 = fs.readFileSync(path2, 'utf-8');
        const data1Keys = data1.split('\n');
        const data2Keys = data2.split('\n');
        // let resultData1 = '';
        // let resultData2 = '';
        // let mapTarget = (data2Keys.length < data1Keys.length) ? data1Keys : data2Keys;
        // mapTarget.map((key) => {
        //     if (data1[key] === data2[key]) {
        //         resultNeutral += `  ${key}: ${data1[key]},\n`;
        //     } else {
        //         if (data1[key] === undefined) {
        //             resultData2 += `+ ${key}: ${data2[key]},\n`;
        //         } else if (data2[key] === undefined) {
        //             resultData1 += `- ${key}: ${data1[key]},\n`;
        //         } else {
        //             resultData1 += `- ${key}: ${data1[key]},\n`;
        //             resultData2 += `+ ${key}: ${data2[key]},\n`;
        //         }
        //     }
        // });
        // const result = `{\n${resultData1}${resultNeutral}${resultData2}}`;
            console.log(data1Keys, data2Keys);
    })
    .option('-f, --format <type>', 'output format')
    .parse();