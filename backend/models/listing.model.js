const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isSell: {
    type: Boolean,
    required: true,
  },
  isRent: {
    type: Boolean,
    required: true,
  },
  isParkingSlot: {
    type: Boolean,
    required: true,
  },
  isFurnished: {
    type: Boolean,
    required: true,
  },
  beds: {
    type: String,
    required: true,
  },
  baths: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: String,
    required: true,
  },
  discountedPrice: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  userId: {
    type: String,
  }
  
}, {timestamps:true});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;