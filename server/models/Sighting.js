const { Schema, model } = require('mongoose');
const { formatDate } = require('../utils/date');

const sightingSchema = new Schema(
  {
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
    dogPersonalities: {
      type: [String],
      enum: ['Cute', 'Grumpy', 'Crazy', 'Doggo', 'Mean', 'Fun', 'Nice'],
    },
    dogPictures: {
      // TODO: Array of URLs of pictures taken by the user. Will need to figure out image hosting
      type: [String],
    },
    ownerName: {
      type: String,
    },
    location: {
      // ? should be the latitude & longitude if the person is on mobile using the app
      type: [Number],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => formatDate(createdAtValue),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Sighting = model('Sighting', sightingSchema);

module.exports = Sighting;
