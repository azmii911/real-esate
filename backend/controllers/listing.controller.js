const Listing = require("../models/listing.model");
const { errorHandler } = require("../utils/error");

const createListing = async (req, res, next) => {

  const {
    title,
    description,
    address,
    isSell,
    isRent,
    isParkingSlot,
    isFurnished,
    beds,
    baths,
    regularPrice,
    discountedPrice,
    userId,
  } = req.body;

  // Ensure that the checkboxes are set to false if not present in the request
  const sanitizedData = {
    title,
    description,
    address,
    isSell: isSell || false,
    isRent: isRent || false,
    isParkingSlot: isParkingSlot || false,
    isFurnished: isFurnished || false,
    beds,
    baths,
    regularPrice,
    discountedPrice: !discountedPrice ? "" : discountedPrice,
    userId,
  };

  try {
    const newListing = new Listing(sanitizedData);
    await newListing.save();
    res.status(201).json({
      message: "New Listing Added Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const allListings = async (req, res, next) => {  
  try {
    // console.log("inside allListings");
    const allListings = await Listing.find({});
    res.status(200).json(allListings)
    // console.log(allListings);
  } catch (error) {
    next(error)
  }
}
const sigleListing = async (req, res, next) => {
  const id  = req.params.id;

  try {
    // console.log("inside allListings");
    const singleLisitng = await Listing.findOne({_id: id});
    res.status(200).json(singleLisitng);
    // console.log(allListings);
  } catch (error) {
    next(error);
  }
};

const editListing = async (req, res, next) => {
  const listingId = req.params.id;

  const listing = await Listing.findOne({_id: listingId});

  if(!listing){
    return next(errorHandler(404, "Listing not found"))
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      {_id: listingId},
      req.body,
      {new:true},
    )

    res.status(200).json(updatedListing);
    
  } catch (error) {
    next(error)
  }

};




module.exports = { createListing, allListings, sigleListing, editListing };
