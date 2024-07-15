import _ from 'lodash';

const makeTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const hasKey1 = _.has(data1, key);
    const hasKey2 = _.has(data2, key);

    if (!hasKey1) {
      return { key, type: 'added', value: value2 };
    }
    if (!hasKey2) {
      return { key, type: 'deleted', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: makeTree(value1, value2),
      };
    }
    if (!_.isEqual(value2, value1)) {
      return {
        key,
        type: 'modified',
        oldValue: value1,
        newValue: value2,
      };
    }
    return { key, type: 'unmodified', value: value2 };
  });
};

export default makeTree;