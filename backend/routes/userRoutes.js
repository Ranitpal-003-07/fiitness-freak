const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById, // Ensure this function is imported
  updateProfile,
  contactUs
} = require("../controllers/userController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verify-email/:token", verifyEmail);

router.get("/:id", getUserById);

router.put("/update-profile", upload.single('profileImage'), updateProfile);

router.post("/contact", contactUs);

module.exports = router;