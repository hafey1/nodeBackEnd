import { executeQueryArray } from '../utils/queryFunctions';

const migration__23_2_21__54_27_10 = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR DEFAULT '',
    message VARCHAR NOT NULL
)`;

executeQueryArray([migration__23_2_21__54_27_10]);
