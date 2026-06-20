const express = require("express");

const {
  addCar,
  getAllCars,
  getHomeCars,
  getSingleCar,
  updateCar,
  deleteCar,
  getMyCars,
} = require("../controllers/car.controller");

const verifyToken = require("../middleware/verifyToken");
const verifyOwner = require("../middleware/verifyOwner");

const router = express.Router();

router.get("/cars", getAllCars);
router.get("/cars/home", getHomeCars);
router.get("/cars/:id", getSingleCar);

router.post("/cars", verifyToken, addCar);
router.get("/my-cars", verifyToken, getMyCars);
router.patch("/cars/:id", verifyToken, verifyOwner, updateCar);
router.delete("/cars/:id", verifyToken, verifyOwner, deleteCar);

module.exports = router;
