const { Sighting, User } = require('../models');
const { authMiddleware } = require('../utils/auth');

module.exports = {
  // Get all sightings
  async getAllSightings(req, res) {
    const sightings = await Sighting.find({})
      .select('-__v')
      .sort({ createdAt: 'desc' })
      .populate({ path: 'users', select: '-__v' });

    if (!sightings) {
      return res
        .status(400)
        .json({ message: 'No sightings found due to a request error.' });
    }

    res.json(sightings);
  },

  // Get one sighting
  async getOneSighting({ params }, res) {
    const sighting = await Sighting.findOne({ _id: params.id });

    if (!sighting) {
      return res
        .status(404)
        .json({ message: 'No dog sighting found with that ID.' });
    }
    return res.json(sighting);
  },

  // Create a sighting
  async createSighting({ body }, res) {
    const newSighting = await Sighting.create(body);

    if (!newSighting) {
      return res
        .status(400)
        .json({ message: 'There was an error creating the dog sighting.' });
    }

    await User.findByIdAndUpdate(
      { _id: body.userId },
      { $push: { sightings: newSighting._id } },
      { new: true }
    );
    res.json(newSighting);
  }

  // Update a sighting
  async updateSighting({ body, params }, res) {
    const updatedSighting = await Sighting.findOneAndUpdate(
      { _id: params.id },
      body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedSighting) {
      return res.status(404).json({ message: 'Dog sighting not found.' });
    }

    res.json({ message: 'The dog sighting was updated.' });
  },

  // Delete a sighting
  async deleteSighting({ user, params }, res) {
    if (!(user && user._id)) {
      return res.status(404).json({ message: 'No user.' });
    }
    const foundUser = await User.findOne({ _id: user._id });
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const deletedSighting = await Sighting.findOneAndDelete({
      _id: params.id,
      user: foundUser._id
    });
    if (!deletedSighting) {
      return res.status(404).json({ message: 'Dog sighting not found.' });
    }

    res.json({ message: 'The dog sighting was deleted.' });
  }
};
