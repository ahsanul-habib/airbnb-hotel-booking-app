import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "/avatar.png"
  },
  password: {
    type: String,
  },
  myBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
    default: []
  }],
  myHotels:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel",
    default: []
  }
  ]

});


const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;