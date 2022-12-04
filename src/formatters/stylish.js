import _ from 'lodash';

const toStr = (item, spaceCount) => {
  if (_.isObject(item)) {
    const space = ' ';
    const result = _.map(item, (value, key) => {
      if (_.isObject(value)) {
        return `${space.repeat(spaceCount + 2)}${key}: ${toStr(value, spaceCount + 4)}`;
      }
      return `${space.repeat(spaceCount + 2)}${key}: ${value}`;
    });
    return `{\n${result.join('\n')}\n${space.repeat(spaceCount - 2)}}`;
  }
  return item;
};

const buildFormated = (arr, spaceCount = 2) => {
  const space = ' ';
  return arr.map((el) => {
    switch (el.status) {
      case 'added':
        return `${space.repeat(spaceCount)}+ ${el.key}: ${toStr(el.value, spaceCount + 4)}`;
      case 'deleted':
        return `${space.repeat(spaceCount)}- ${el.key}: ${toStr(el.value, spaceCount + 4)}`;
      case 'updated': {
        const firstFile = `${space.repeat(spaceCount)}- ${el.key}: ${toStr(el.value1, spaceCount + 4)}`;
        const secondFile = `${space.repeat(spaceCount)}+ ${el.key}: ${toStr(el.value2, spaceCount + 4)}`;
        return `${firstFile}\n${secondFile}`;
      }
      case 'notChanged':
        return `${space.repeat(spaceCount + 2)}${el.key}: ${toStr(el.value, spaceCount + 4)}`;
      case 'nested': {
        const nestedEl = buildFormated(el.childrens, spaceCount + 4).join('\n');
        return `${space.repeat(spaceCount + 2)}${el.key}: {\n${nestedEl}\n${space.repeat(spaceCount + 2)}}`;
      }
      default:
        throw new Error('unknown status');
    }
  });
};

export default (data) => {
  const result = buildFormated(data).join('\n');
  return `{\n${result}\n}`;
};
