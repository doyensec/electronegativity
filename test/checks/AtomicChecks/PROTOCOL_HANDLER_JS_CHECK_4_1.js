const { protocol } = require('electron');
const { PassThrough } = require('stream');

function createStream (text) {
  const rv = new PassThrough(); // PassThrough is also a Readable stream
  rv.push(text);
  rv.push(null);
  return rv;
}

protocol.registerStreamProtocol('atom', (request, callback) => {
  callback({
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    data: createStream('<h5>Response</h5>')
  });
}, (error) => {
  if (error) console.error('Failed to register protocol');
});