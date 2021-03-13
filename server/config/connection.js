const mongoose = require('mongoose');

// * Turn Mongoose Debug mode on or off by commenting/uncommenting this next line:
// mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dog-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;