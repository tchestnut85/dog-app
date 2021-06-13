const { User, Sighting } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // GET all users
  async getAllUsers(req, res) {
    const users = await User.find({}).select('-__v');
    // ! Getting an error when the populate is turned on
    // .populate('sightings');

    if (!users) {
      return res.status(400).json({ message: "Couldn't find users." });
    }

    res.json(users);
  },

  // Create a user
  async createUser({ body }, res) {
    // create a user, sign the token and send it back
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // Login a user
  async loginUser({ body }, res) {
    // login the user, sign the token and send it back
    const user = await User.findOne({
      name: body.name
    });

    if (!user) {
      return res.status(400).json({ message: `We couldn't find this user.` });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = signToken(user);
    res.json({ token, user });
  },

  // Get a single user by either their ID or name
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { name: params.name }]
    })
      // .populate({ path: 'sightings', select: '-__v' })
      .select('-__v');

    if (!foundUser) {
      return res.status(404).json({ message: `Couldn't find this user.` });
    }

    res.json(foundUser);
  },

  // Update a user
  async updateUser({ params, body }, res) {
    const updatedUser = await User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
    }).select('-__v');

    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't update user." });
    }
    res.json({ message: 'The user was updated.', updatedUser });
  },

  // Delete a user
  async deleteUser({ params }, res) {
    const deletedUser = await User.findOneAndDelete({ _id: params.id });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find user with that ID." });
    }

    try {
      await Sighting.deleteMany(
        { username: deletedUser.name },
        { new: true, runValidators: true }
      );
    } catch (err) {
      console.error(err);
    }

    res.json({
      message: `${deletedUser.name} was deleted.`
    });
  }
};
