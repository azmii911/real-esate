const Listing = require("../models/listing.model.js");
const User = require("../models/user.model.js");
const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");

const updateUser = async (req, res, next) => {
  const { firstName, lastName, email, password, newPassword, about } = await req.body;

  const { id } = await req.params;

  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    // Retrieve the current user from the database
    const currentUser = await User.findById(id);

    // Check if the provided current password is correct
    if (password && !bcryptjs.compareSync(password, currentUser.password)) {
      return next(errorHandler(401, "Current password is incorrect."));
    }

    // Check if newPassword is provided and not null or empty
    if (newPassword !== null && newPassword !== "") {
      // Check if the new password is the same as the current password
      if (bcryptjs.compareSync(newPassword, currentUser.password)) {
        return next(
          errorHandler(
            400,
            "New password cannot be the same as the current password."
          )
        );
      }

      // Hash the new password
      const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);

      // Update the user in the database
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            firstName,
            lastName,
            email,
            password: hashedNewPassword,
            about,
          },
        },
        { new: true }
      );

      // Exclude password from the response
      const { password: excludedPassword, ...otherInfo } = updatedUser._doc;

      // Send the updated user information in the response
      res.status(201).json(otherInfo);
    } else {
      // If newPassword is not provided, update other fields without changing the password
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            firstName,
            lastName,
            email,
            about,
          },
        },
        { new: true }
      );

      // Exclude password from the response
      const { password: excludedPassword, ...otherInfo } = updatedUser._doc;

      // Send the updated user information in the response
      res.status(201).json(otherInfo);
    }
  } catch (error) {
    next(error);
  }
};

const allListings = async (req, res ,next) => {
    const id  = req.params.id;

    console.log("id>>", id);
   try {
     const allListings = await Listing.find({ userId: id });
     res.status(200).json(allListings);
   } catch (error) {
     next(error);
   }
}

const getUser = async (req, res, next) => {
    const id = req.params.id;

  try {
    const user = await User.findOne({_id: id})
        const { password: excludedPassword, ...otherInfo } = user._doc;

    res.status(200).json(otherInfo);
    
  } catch (error) {
    next(error)
  }
};

module.exports = { updateUser, allListings, getUser };

