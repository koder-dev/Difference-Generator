import _ from 'lodash';

const compare = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const result = keys.map((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, status: 'deleted', value: data1[key] };
    }
    if (_.has(data2, key) && !_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, status: 'nested', childrens: compare(data1[key], data2[key]) };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, status: 'notChanged', value: data1[key] };
    }
    return {
      key, status: 'updated', value1: data1[key], value2: data2[key],
    };
  });
  return result;
};

export default compare;
