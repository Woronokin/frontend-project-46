import _ from 'lodash';

const nodeHandlers = {
  added: (key, value) => ({ key, type: 'added', value }),
  deleted: (key, value) => ({ key, type: 'deleted', value }),
  nested: (key, value1, value2, func) => ({
    key,
    type: 'nested',
    children: func(value1, value2),
  }),
  modified: (key, value1, value2) => ({
    key,
    type: 'modified',
    oldValue: value1,
    newValue: value2,
  }),
  unmodified: (key, value) => ({ key, type: 'unmodified', value }),
};

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
      return nodeHandlers.added(key, value2);
    } if (!hasKey2) {
      return nodeHandlers.deleted(key, value1);
    } if (_.isObject(value1) && _.isObject(value2)) {
      return nodeHandlers.nested(key, value1, value2, makeTree);
    } if (!_.isEqual(value1, value2)) {
      return nodeHandlers.modified(key, value1, value2);
    }
    return nodeHandlers.unmodified(key, value1);
  });
};

export default makeTree;
