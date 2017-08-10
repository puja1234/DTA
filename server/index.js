'use strict';
// Set default node environment to development
import config from "./config/environment";
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("env----------",env)

if(env === 'development' || env === 'test') {
  // Register the Babel require hook
  require('babel-register');
}
let app =require('./app');
const startServer = (buildStats) => {
  // console.log('We are all set for starting the server.Yieppeee ');
    const server = app.listen(config.port, 'localhost', () => {
    console.log('Express server listening on in mode');
  });
};

startServer();
// Export the application
 module.exports = require('./app');
