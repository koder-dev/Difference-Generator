import _ from 'lodash';

const plain = (data, parrent) => {
  const p = parrent ? `${parrent}.` : '';
  const result = data.map((el) => {
    const { status, key } = el;
    switch (status) {
      case 'deleted':
        return `Property '${p}${key}' was removed`;
      case 'added': {
        let { value } = el;
        if (typeof value === 'string') value = `'${value}'`;
        value = _.isObject(el.value) ? '[complex value]' : value;
        return `Property '${p}${key}' was added with value: ${value}`;
      }
      case 'updated': {
        let { value1, value2 } = el;

        if (typeof value1 === 'string') value1 = `'${value1}'`;
        if (typeof value2 === 'string') value2 = `'${value2}'`;

        value1 = _.isObject(el.value1) ? '[complex value]' : value1;
        value2 = _.isObject(el.value2) ? '[complex value]' : value2;

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
