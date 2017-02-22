const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Updating records', () => {

	let char;

	beforeEach( (done) => {
		char = new MarioChar({
			name: 'Mario',
			weight: 75
		});

		char.save().then(() => done());
	})

	// Create tests
	it('Updates one record from the database', (done) => {
		MarioChar.findOneAndUpdate({ name: 'Mario'}, {name:'Luigi'}).then( () => {
			MarioChar.findOne({_id: char._id}).then( (result) => {
				assert(result.name === 'Luigi');
				done();
			});
		});
	});

	it('Increments the weight by 1', (done) => {
		MarioChar.update({},{ $inc: { weight: 1 } }).then( () => {
			MarioChar.findOne({ name: 'Mario'}).then( (record) => {
				assert(record.weight === 76);
				done();
			});
		});
	});
}); 