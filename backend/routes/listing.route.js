const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  createListing,
  allListings,
  sigleListing,
  editListing,
} = require("../controllers/listing.controller");

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/all", allListings);
router.post("/editlisting/:id", verifyToken, editListing);
router.get("/listing/:id", sigleListing);

module.exports = router;
