const express = require("express");

const {
  addCar,
  getAllCars,
  getHomeCars,
  getSingleCar,
  updateCar,
  deleteCar,
} = require("../controllers/car.controller");

const router = express.Router();

router.post("/cars", addCar);
router.get("/cars", getAllCars);
router.get("/cars/home", getHomeCars);
router.get("/cars/:id", getSingleCar);
router.patch("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;
