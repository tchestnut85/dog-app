const { Schema, model } = require('mongoose');

const sightingSchema = new Schema({
  dogNames: {
    type: [String],
    required: true,
    trim: true,
    lowercase: true,
  },
  dogBreeds: {
    type: [String],
    required: true,
    trim: true,
    lowercase: true,
  },
  dogAges: {
    type: [Number],
    min: 1,
  },
  dogPictures: {
    // TODO: Array of URLs of pictures taken by the user. Will need to figure out image hosting
    type: [String],
  },
  dogPersonalities: {
    type: [String],
    enum: ['Cute', 'Grumpy', 'Crazy', 'Doggo', 'Mean', 'Fun', 'Nice'],
  },
  location: {
    // ! should be the latitude & longitude if the person is on mobile using the app
    type: [Number],
  },
  ownerName: {
    type: String,
  },
});

const Sighting = model('Sighting', sightingSchema);

module.exports = Sighting;
