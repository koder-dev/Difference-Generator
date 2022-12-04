import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const plain = (data, parrent) => {
  const p = parrent ? `${parrent}.` : '';
  const result = data.map((el) => {
    const { status, key } = el;
    switch (status) {
      case 'deleted':
        return `Property '${p}${key}' was removed`;
      case 'added': {
        const value = formatValue(el.value);
        return `Property '${p}${key}' was added with value: ${value}`;
      }
      case 'updated': {
        const value1 = formatValue(el.value1);
        const value2 = formatValue(el.value2);
        return `Property '${p}${key}' was updated. From ${value1} to ${value2}`;
      }
      case 'nested': {
        const parentEl = p ? `${p}${key}` : key;
        return plain(el.childrens, parentEl);
      }
      default:
        return [];
    }
  });
  return result;
};

export default (data) => {
  const result = _.flattenDeep(plain(data)).join('\n');
  return result;
};
