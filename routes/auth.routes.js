const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "Login successful.",
    });
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "Logout successful.",
    });
});

module.exports = router;
