import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
  createTable,
} from './queries';

export const executeQueryArray = async (arr) => {
  try {
    new Promise((resolve) => {
      const stop = arr.length;
      arr.forEach(async (q, index) => {
        await pool.query(q);
        if (index + 1 === stop) resolve();
      });
    });
  } catch (e) {
    console.error(e);
  }
};
export const dropTables = () => executeQueryArray([dropMessagesTable]);
export const createTables = () => executeQueryArray([createTable()]);
export const insertIntoTables = () => executeQueryArray([insertMessages]);
