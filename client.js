const thrift = require('thrift');
const SimpleService = require('./gen-nodejs/SimpleService');

const connection = thrift.createConnection('test-timeout-thrift-server-svc', 9090, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol
});

const client = thrift.createClient(SimpleService, connection);

client.delayedResponse((err, response) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Response:', response);
  }
  connection.end();
});
