import { createTable } from './queries';
import { executeQueryArray } from './queryFunctions';
import moment from 'moment';

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);
// return an array of objects with the SQL statement and boolean
// boolean gets set to true if file contains the query

const checkMigrations = async (queryString) => {
  // get files
  try {
    const files = await readdir('./src/migrations/');

    console.log(files);
    // get content of each file
    let schemaPieces = await Promise.all(
      files.map(async (file) => {
        return readfile('./src/migrations/' + file, 'utf8');
      })
    );
    // returns false if SQL statment is found in any file
    return schemaPieces.reduce((accum, curr) => {
      console.log(curr.includes(queryString));
      return accum || curr.includes(queryString);
    }, false);
  } catch (e) {
    console.log(e);
  }
};

const makeMigrations = async (qString) => {
  const inAMigration = await checkMigrations(qString);
  console.log(inAMigration);
  const fileNameTime = moment().format('D_M_YY');
  const functionNameTime =
    'migration__' + moment().format('D[_]M[_]YY[__]ss[_]mm[_]hh');
  const data =
    "import { executeQueryArray } from '../utils/queryFunctions';\n\n" +
    'const ' +
    functionNameTime +
    ' = `\n' +
    qString +
    '`;\n\n' +
    'executeQueryArray([' +
    functionNameTime +
    ']);';

  if (!inAMigration) {
    await writefile(
      './src/migrations/migration__' + fileNameTime + '.js',
      data
    );
  }
};

//test checkMigrations
const qString = createTable('messages', [
  { attribute: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY' },
  {
    attribute: 'name',
    type: 'VARCHAR',
    constraints: "DEFAULT ''",
  },
  {
    attribute: 'message',
    type: 'VARCHAR',
    constraints: 'NOT NULL',
  },
]);

makeMigrations(qString);
