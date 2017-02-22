const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to the database before tests run
before(function(done) {
	// connect to mongodb
	mongoose.connect('mongodb://localhost/testaroo');

	mongoose.connection.once('open', () => {
		console.log('Connection has been made.')
		done();
	}).on('error', (error) => console.log('Connection error: ', error));
})


// Drop (delete) the characters collection before each test
beforeEach( (done) => 
	mongoose.connection.collections.mariochars.drop( () => done() )
);