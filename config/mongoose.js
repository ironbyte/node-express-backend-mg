const mongoose = require('mongoose');
const { env, mongo } = require('./vars');

mongoose.Promise = global.Promise;

mongoose.connect(mongo.uri, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${mongo.uri}`))
mongoose.connection.on('error', (err) => console.log(`  Mongoose connection error: ${err}`));

if (env === 'development') {
  mongoose.set('debug', true);
}
