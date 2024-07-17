import stylish from './stylish.js';
import plain from './plain.js';

const renderInFormat = (diffTree, format) => {
  switch (format) {
    case 'plain':
      return plain(diffTree);
    case 'stylish':
      return stylish(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default renderInFormat;
