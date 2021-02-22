export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR DEFAULT '',
    message VARCHAR NOT NULL
)
`;

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
    ('orji', 'second message')
`;

// input: batchMessageEntry: array of objects containing username and message, both of type string
// output: SQL syntax string to insert the values of batchMessageEntry into the messages table
export const insertMessageWithName = (batchMessageEntry) => {
  let messageBatch = `INSERT INTO messages(name, message)\nVALUES ${batchMessageEntry
    .map((ele) => {
      return `('${ele.username}', '${ele.message
        .replaceAll("'", ' ')
        .replaceAll('\n\n', ' ')}'),`;
    })
    .join('\n')}`.replace(/,\s*$/, '\n');
  console.log(messageBatch);
  return messageBatch;
};
export const dropMessagesTable = 'DROP TABLE messages';
