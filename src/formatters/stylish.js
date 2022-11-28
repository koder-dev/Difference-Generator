import _ from "lodash";

const buildStr = (formatedData, spaceCount = 2) => {
    let str = `{\n`
    const space = ' ';
    _.forEach(formatedData, (v, k) => {
        if (k[0].match('[a-z]')) k = `  ${k}`;
        if (_.isObject(v)) {
            str += `${space.repeat(spaceCount)}${k}: ${buildStr(v, spaceCount + 4)}${space.repeat(spaceCount + 2)}}\n`;
        } else {
            str += `${space.repeat(spaceCount)}${k}: ${v}\n`;
        }
    });
    return str;
}

const buildFormated = (arr) => {
    const result = {};
    arr.forEach((el) => {
        switch(el.status) {
            case 'added':
                result[`+ ${el.key}`] = el.value;
                break;
            case 'deleted':
                result[`- ${el.key}`] = el.value;
                break;
            case 'updated':
                result[`- ${el.key}`] = el.value1;
                result[`+ ${el.key}`] = el.value2;
                break;
            case 'notChanged':
                result[`${' '.repeat(2)}${el.key}`] = el.value;
                break;
            case 'nested':
                result[`${' '.repeat(2)}${el.key}`] = buildFormated(el.childrens);
                break;
            default:
                throw new Error(`unknown status`);
        }
    });
    return result;
} 
export default (data) => {
    const formatedData = buildFormated(data);
    let str = buildStr(formatedData);
    return `${str}}`;
}