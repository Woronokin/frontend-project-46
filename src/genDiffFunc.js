import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (value1 !== value2) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }
    return `    ${key}: ${value1}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;