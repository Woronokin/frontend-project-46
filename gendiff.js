import { Command } from 'commander';
import parseFile from './fileParser.js';
import genDiff from './genDiffFunc.js';

const program = new Command();

program
    .version('1.0.0')
    .description('Equates the two configuration files and shows the difference between them')
    .usage('[options] <filepath1> <filepath2>')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'json')
    .action((filepath1, filepath2, options = {}) => {
        try {
            const fileData1 = parseFile(filepath1);
            const fileData2 = parseFile(filepath2);

            const diff = genDiff(fileData1, fileData2);
            console.log(diff);
            console.log(`Selected format: ${options.format}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    });

export default program;