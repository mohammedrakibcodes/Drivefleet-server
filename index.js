require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const carRoutes = require("./routes/car.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", carRoutes);
app.use("/api", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running.",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
