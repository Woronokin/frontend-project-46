#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .version('1.0.0')
  .description('Equates the two configuration files and shows the difference between them')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options = {}) => {
    console.log(`Filepaths: ${filepath1}, ${filepath2}`);
    console.log(`Selected format: ${options.format}`);
  });

program.parse(process.argv);