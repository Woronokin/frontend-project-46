import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileExtension = path.extname(absolutePath);
  const parser = parsers[fileExtension];

  if (!parser) {
    throw new Error(`Unsupported file format: ${fileExtension}`);
  }

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  try {
    return parser(fileContent);
  } catch (error) {
    throw new Error(`Error parsing ${filepath}: ${error.message}`);
  }
};

export default parseFile;