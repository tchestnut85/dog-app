const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6
    },
    sightings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sighting'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// middleware to create a new or update a password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// validate and compare the incoming passwird wuth the hashed one
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// When querying a user, get the total number of dog sightings they have
userSchema.virtual('sightingsCount').get(function () {
  return this.sightings.length;
});

const User = model('User', userSchema);

module.exports = User;
