const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
});

const hotelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    required: true,
    }
  ],
  amenities: {
    beachAccess: {
      type: Boolean,
      default: false,
    },
    privatePool: {
      type: Boolean,
      default: false,
    },
    freeWiFi: {
      type: Boolean,
      default: false,
    },
    kitchen: {
        type: Boolean,
        default: false,
    },
    freeParking: {
      type: Boolean,
      default: false,
    },
    fitnessCenter: {
      type: Boolean,
      default: false,
    }
  },
  ratings: [ratingSchema],
  pricePerNight: {
    type: Number,
    required: true,
  },
  roomsAvailable: {
    type: Number,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  numberOfBedrooms: {
    type: Number,
    required: true,
  },
  numberOfBeds: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const hotelModel =mongoose.models.hotel || mongoose.model('hotel', hotelSchema);

module.exports = hotelModel;
