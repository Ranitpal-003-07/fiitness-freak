const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verificationEmail = require("../emailTemplates/verificationEmail");
const { console } = require("inspector");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email, isVerified: true });
    const userNotVerified = await User.findOne({ email, isVerified: false });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (userNotVerified) {
      await userNotVerified.deleteOne();
    }


    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = verificationEmail(name, verificationToken);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    res.status(201).json({
      message: "User registered. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email2, password2 } = req.body;
  console.log("Login attempt:", { email2, password2 }); // Log the login attempt
  const email=email2;

  try {
    const user = await User.findOne({ email });
    console.log("User fetched from DB:", user); // Log the user data fetched from DB

    if (user) {
      console.log(user.password);
      console.log("Password check:", await bcrypt.compare(password2, user.password)); // Log the password check result

      if (password2===user.password) {
        if (!user.isVerified) {
          return res.status(400).json({ message: "Email not verified" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        return res.status(200).json({ token });
      }
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to log in. Please try again." });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Verification link expired" });
    }
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user data. Please try again." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, name, password, height, weight, gender, age } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.gender = gender || user.gender;
    user.age = age || user.age;

    if (req.file) {
      const path = require("path");
      user.profileImage = path.join("/uploads", req.file.filename).replace(/\\/g, "/");
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      height: updatedUser.height,
      weight: updatedUser.weight,
      gender: updatedUser.gender,
      age: updatedUser.age,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile." });
  }
};

const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || "ftracker60@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    res.status(500).json({ message: "Failed to send your message. Please try again." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById,
  updateProfile,
  contactUs,
};
