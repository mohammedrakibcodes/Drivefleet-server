require("dotenv").config();
const { connectDB } = require("./config/db");
const carRoutes = require("./routes/car.routes");
const authRoutes = require("./routes/auth.routes");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", carRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api", carRoutes);

app.get("/", (req, res) => {
  res.send(" Server Running...");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
