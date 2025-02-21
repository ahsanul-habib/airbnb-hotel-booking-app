import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: [true, 'Card number is required'],
    validate: {
      validator: (v) => /^[0-9]{16}$/.test(v),
      message: 'Card number must be a 16-digit number',
    },
  },
  expiration: {
    type: String,
    required: [true, 'Expiration date is required'],
    validate: {
      validator: (v) => /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(v),
      message: 'Expiration must be in MM/YY format',
    },
  },
  cvv: {
    type: String,
    required: [true, 'CVV is required'],
    validate: {
      validator: (v) => /^[0-9]{3}$/.test(v),
      message: 'CVV must be a 3-digit number',
    },
  },

  streetAddress: {
    type: String,
    required: [true, 'Street address is required'],
  },
  aptOrSuite: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  zipCode: {
    type: String,
    required: [true, 'Zip code is required'],
  },

  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be greater than 0'],
  },

  guests: {
    type: Number,
    required: [true, 'Guests number is required'],
    min: [1, 'At least one guest is required'],
  },

  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required'],
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required'],
  },
  pricePerNight:{
    type: Number,
    required: [true, 'Price per night is required'],
  },
  paymentStatus:{
    type: String,
    enum: ['paid', 'pending'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel',
        required: true,
    },

}, { timestamps: true });

const PaymentModel = mongoose.models.payment || mongoose.model('payment', paymentSchema);

export default PaymentModel;
