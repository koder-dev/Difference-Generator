import _ from "lodash";

const plain = (data, parrent) => {
  const p = parrent ? `${parrent}.` : '';
  const result = data.map((el) => {
    switch (el.status) {
      case 'deleted':
        return `Property '${p}${el.key}' was removed`;
      case 'added': {
        let value = el.value;
        if (typeof el.value === 'string') value = `'${el.value}'`;
        value = _.isObject(el.value) ? '[complex value]' : value;
        return `Property '${p}${el.key}' was added with value: ${value}`;
      }
      case 'updated': {
        let value1 = el.value1;
        let value2 = el.value2;

        if (typeof el.value1 === 'string') value1 = `'${el.value1}'`;
        if (typeof el.value2 === 'string') value2 = `'${el.value2}'`;

        value1 = _.isObject(el.value1) ? '[complex value]' : value1;
        value2 = _.isObject(el.value2) ? '[complex value]' : value2;
        
        return `Property '${p}${el.key}' was updated. From ${value1} to ${value2}`;
      }
      case 'nested': {
        const parentEl = p ? `${p}${el.key}` : el.key;
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
}
