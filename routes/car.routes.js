const express = require("express");

const {
  addCar,
  getAllCars,
  getHomeCars,
} = require("../controllers/car.controller");
const router = express.Router();

router.post("/cars", addCar);
router.get("/cars", getAllCars);
router.get("/cars/home", getHomeCars);

module.exports = router;
