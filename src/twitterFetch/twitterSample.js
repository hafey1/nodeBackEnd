import { bearerToken } from '../settings';

const needle = require('needle');

const sampleStreamURL = 'https://api.twitter.com/2/tweets/sample/stream';

export const sampleStreamConnect = () => {
  const stream = needle.get(sampleStreamURL, {
    headers: {
      'User-Agent': 'v2SampleStreamJS',
      Authorization: `Bearer ${bearerToken}`,
    },
    timeout: 20000,
  });

  stream
    .on('data', (data) => {
      try {
        const json = JSON.parse(data);
        console.log(json);
      } catch (e) {
        // do nothings
      }
    })
    .on('error', (error) => {
      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });
  return stream;
};

//careful they used to ride these babies for miles
sampleStreamConnect();
