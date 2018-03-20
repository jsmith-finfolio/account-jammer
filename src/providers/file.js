import { prompt } from 'inquirer';
import { createReadStream } from 'fs';
import csv from 'fast-csv';
import { resolve } from 'path';


const accountPrompts = [{
    name: 'filePath',
    message: 'Path to accounts file: '
}];

const parseAccountData = () => new Promise((resolve, reject) => {
    prompt(accountPrompts).then(({ filePath }) => {
        let records = [];
        const fileStream = createReadStream(filePath);
        const csvStream = csv()
            .on('data', data => records.push(data))
            .on('end', () => resolve(parseDataInRows(records)))
            .on('error', e => reject(e));

        fileStream.pipe(csvStream);
    });
});

const parseDataInRows = rows => rows
    .slice(1, rows.length)
    .map(row => {
        return {
            fullName: row[0],
            email: row[1],
            portal: row[2],
            roles: row[3]
        }
    });

export {
    parseAccountData
}