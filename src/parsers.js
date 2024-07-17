import yaml from 'js-yaml';

const parseFile = ({ content, type }) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.load(content);
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unknown format: '${type}'!`);
  }
};

export default parseFile;
