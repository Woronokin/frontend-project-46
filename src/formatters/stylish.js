/* eslint-disable no-use-before-define */
import _ from 'lodash';

const quantityOfSpacesForEachLevel = 4;
const getIndent = (nestingLevel) => ' '.repeat(nestingLevel * quantityOfSpacesForEachLevel);

const stringify = (value, nestingLevel) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const indent = getIndent(nestingLevel);
  const bracketIndent = getIndent(nestingLevel - 1);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, nestingLevel + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatNode = (node, indent, currentNestingLevel) => {
  const {
    key, value, type, oldValue, newValue, children,
  } = node;

  switch (type) {
    case 'deleted':
      return `${indent}- ${key}: ${stringify(value, currentNestingLevel + 1)}`;
    case 'added':
      return `${indent}+ ${key}: ${stringify(value, currentNestingLevel + 1)}`;
    case 'unmodified':
      return `${indent}  ${key}: ${stringify(value, currentNestingLevel + 1)}`;
    case 'modified':
      return [
        `${indent}- ${key}: ${stringify(oldValue, currentNestingLevel + 1)}`,
        `${indent}+ ${key}: ${stringify(newValue, currentNestingLevel + 1)}`,
      ].join('\n');
    case 'nested':
      return `${indent}  ${key}: {\n${iterate(children, currentNestingLevel + 1).join('\n')}\n${getIndent(currentNestingLevel)}}`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const iterate = (nodes, currentNestingLevel) => {
  const indent = getIndent(currentNestingLevel).slice(2);
  return nodes.map((node) => formatNode(node, indent, currentNestingLevel));
};

const stylish = (diffTree, nestingLevel = 1) => {
  const lines = iterate(diffTree, nestingLevel);
  return `{\n${lines.join('\n')}\n${getIndent(nestingLevel - 1)}}`;
};

export default stylish;
