#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .version('1.0.0')
  .description('The program equates the two configuration files and shows the difference between them')
  .parse(process.argv);