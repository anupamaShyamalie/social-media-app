const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,  // Fix typo: require -> required
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default: "",  // Fix missing colon: default:"" -> default: ""
    },
    city: {
      type: String,
      max: 50,
      default: "",  // Fix missing colon: default:"" -> default: ""
    },
    from: {
      type: String,
      max: 50,
      default: "",  // Fix missing colon: default:"" -> default: ""
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
