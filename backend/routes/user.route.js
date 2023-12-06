const express = require("express");
const {
  updateUser,
  allListings,
  getUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.post("/listings/:id", verifyToken, allListings);
router.get("/getuser/:id", getUser);

module.exports = router;
