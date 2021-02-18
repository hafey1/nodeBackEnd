import { bearerToken } from '../settings';

const needle = require('needle');

const ruleURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const filteredStreamURL = 'https://api.twitter.com/2/tweets/search/stream';

// rule structure for filterstream
const rules = [
  {
    value: '(wandavision OR ultron OR agnes) lang:en -is:retweet',
    tag: 'wandavision english',
  },
];

async function getAllRules() {
  const response = await needle('get', ruleURL, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body);
  }
  console.log(response.body.meta);
  return response.body;
}

async function deleteAllRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: { ids: ids },
  };

  const response = await needle('post', ruleURL, data, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body);
  }

  return response.body;
}

async function setRules() {
  const data = {
    add: rules,
  };

  const response = await needle('post', ruleURL, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.statusCode !== 201) {
    throw new Error(response.body);
  }

  return response.body;
}

function streamConnect() {
  const stream = needle.get(filteredStreamURL, {
    headers: {
      'User-Agent': 'v2FilterStreamJS',
      Authorization: `Bearer ${bearerToken}`,
    },
    timeout: 20000,
  });
  console.log('im here');
  stream
    .on('data', (data) => {
      try {
        const json = JSON.parse(data);
        console.log(json);
      } catch (e) {
        //do nothing
        console.log(e);
      }
    })
    .on('error', (error) => {
      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });

  return stream;
}

(async () => {
  let current;
  try {
    // gets all rules currently applied
    current = await getAllRules();
    // delete all rules
    await deleteAllRules(current);
    // set rules
    await setRules();

    console.log('ahhhh im ending');
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }

  streamConnect();
})();
