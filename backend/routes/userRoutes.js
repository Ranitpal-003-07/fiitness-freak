const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById,
  updateProfile,
  contactUs
} = require("../controllers/userController");

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the 'uploads' directory exists in your root folder
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1609459200000.jpg
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});

// Register route (with email verification)
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Email verification route
router.get("/verify-email/:token", verifyEmail);

// Get user by ID route
router.get("/:id", getUserById);

// Update profile route with file upload
router.put("/update-profile", upload.single('profileImage'), updateProfile);

// Contact us route
router.post("/contact", contactUs);

module.exports = router;
