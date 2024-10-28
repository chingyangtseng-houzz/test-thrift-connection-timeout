const thrift = require('thrift');
const SimpleService = require('./gen-nodejs/SimpleService');

const server = thrift.createServer(SimpleService, {
  delayedResponse: function(result) {
    setTimeout(() => {
      result(null, 'Response after 70 seconds');
    }, 70000); // 70 seconds
  }
});

server.listen(9090);
console.log('Thrift server running on port 9090');

// Handle termination signals
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
