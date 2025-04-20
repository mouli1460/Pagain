const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔐 Sync user from Firebase Auth into MongoDB
router.post("/login", async (req, res) => {
  const { uid, email, displayName } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, displayName });
      await user.save();
    }

    res.status(200).json({ message: "User synced", user });
  } catch (err) {
    console.error("User login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
